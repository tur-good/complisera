create extension if not exists pgcrypto;

create type public.account_role as enum ('client', 'partner', 'admin');
create type public.verification_state as enum ('verification_required', 'review', 'pending', 'verified', 'completed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  locale text not null default 'en',
  role public.account_role not null default 'client',
  created_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  country_code char(2) not null,
  legal_name text,
  tax_identifier text,
  business_address text,
  created_at timestamptz not null default now()
);
create index companies_owner_idx on public.companies(owner_id);

create table public.countries (
  id uuid primary key default gen_random_uuid(),
  code char(2) not null unique,
  slug text not null unique,
  name text not null,
  eu_member boolean not null default true,
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.regulatory_sources (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id) on delete cascade,
  authority text not null,
  title text not null,
  url text not null,
  official boolean not null default true,
  source_version text,
  last_checked date,
  created_at timestamptz not null default now()
);

create table public.eu_country_rules (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references public.countries(id) on delete cascade,
  regulation text not null,
  rule_key text not null,
  rule_value jsonb,
  producer_definition text,
  registration_required text not null default 'verification_required',
  ar_required text not null default 'verification_required',
  pro_required text not null default 'verification_required',
  reporting_frequency text,
  small_business_rules text,
  packaging_categories jsonb,
  official_registry text,
  source_id uuid references public.regulatory_sources(id),
  source_version text,
  effective_from date not null,
  effective_until date,
  last_verified date,
  verified_by uuid references public.profiles(id),
  confidence text not null default 'unverified',
  legal_review_status text not null default 'verification_required',
  notes text,
  created_at timestamptz not null default now(),
  unique(country_id, rule_key, effective_from)
);
create index country_rules_effective_idx on public.eu_country_rules(country_id, effective_from, effective_until);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table public.packaging_profiles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.packaging_materials (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.packaging_profiles(id) on delete cascade,
  material text not null,
  packaging_type text not null,
  grams_per_shipment numeric(12,3) not null check (grams_per_shipment >= 0)
);

create table public.shipments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  country_id uuid not null references public.countries(id),
  product_id uuid references public.products(id) on delete set null,
  annual_orders integer not null check (annual_orders >= 0),
  reporting_year integer not null check (reporting_year between 2020 and 2100),
  unique(company_id, country_id, product_id, reporting_year)
);

create table public.compliance_requirements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  country_rule_id uuid not null references public.eu_country_rules(id),
  status text not null default 'review',
  evidence_status text not null default 'missing',
  assessment_date date not null default current_date,
  rule_snapshot jsonb not null default '{}'::jsonb
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  company_name text not null,
  country_code char(2) not null,
  services jsonb not null default '[]'::jsonb,
  supported_regulations jsonb not null default '[]'::jsonb,
  contact_email text,
  website text,
  pricing_model text,
  bulk_pricing boolean,
  api_available boolean,
  producers_represented integer,
  verification_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  country_id uuid references public.countries(id),
  type text not null,
  storage_key text not null unique,
  filename text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.deadlines (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  country_id uuid references public.countries(id),
  title text not null,
  due_at timestamptz,
  rule_version_id uuid references public.eu_country_rules(id),
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  plan text not null,
  provider text not null,
  external_customer_id text,
  external_subscription_id text unique,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  partner_id uuid not null references public.partners(id),
  service text not null,
  status text not null default 'pending',
  commission_cents integer check (commission_cents is null or commission_cents >= 0),
  created_at timestamptz not null default now()
);

create table public.login_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'login',
  status text not null default 'waiting',
  created_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  email text not null,
  category text not null,
  message text not null,
  consent_at timestamptz not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index support_tickets_status_idx on public.support_tickets(status, created_at desc);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id text not null,
  action text not null,
  before_json jsonb,
  after_json jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, coalesce(new.email, ''), coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

create or replace function public.owns_company(company uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$ select exists(select 1 from public.companies where id = company and owner_id = auth.uid()) $$;

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.countries enable row level security;
alter table public.regulatory_sources enable row level security;
alter table public.eu_country_rules enable row level security;
alter table public.products enable row level security;
alter table public.packaging_profiles enable row level security;
alter table public.packaging_materials enable row level security;
alter table public.shipments enable row level security;
alter table public.compliance_requirements enable row level security;
alter table public.partners enable row level security;
alter table public.documents enable row level security;
alter table public.deadlines enable row level security;
alter table public.subscriptions enable row level security;
alter table public.referrals enable row level security;
alter table public.login_waitlist enable row level security;
alter table public.support_tickets enable row level security;
alter table public.audit_logs enable row level security;

create policy profiles_self_select on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy profiles_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy companies_owner_all on public.companies for all using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
create policy countries_public_read on public.countries for select using (true);
create policy countries_admin_write on public.countries for all using (public.is_admin()) with check (public.is_admin());
create policy sources_public_read on public.regulatory_sources for select using (official = true);
create policy sources_admin_write on public.regulatory_sources for all using (public.is_admin()) with check (public.is_admin());
create policy rules_public_read on public.eu_country_rules for select using (true);
create policy rules_admin_write on public.eu_country_rules for all using (public.is_admin()) with check (public.is_admin());
create policy products_owner_all on public.products for all using (public.owns_company(company_id)) with check (public.owns_company(company_id));
create policy profiles_owner_all on public.packaging_profiles for all using (public.owns_company(company_id)) with check (public.owns_company(company_id));
create policy materials_owner_all on public.packaging_materials for all using (exists(select 1 from public.packaging_profiles p where p.id = profile_id and public.owns_company(p.company_id))) with check (exists(select 1 from public.packaging_profiles p where p.id = profile_id and public.owns_company(p.company_id)));
create policy shipments_owner_all on public.shipments for all using (public.owns_company(company_id)) with check (public.owns_company(company_id));
create policy requirements_owner_all on public.compliance_requirements for all using (public.owns_company(company_id)) with check (public.owns_company(company_id));
create policy partners_authenticated_read on public.partners for select using (auth.uid() is not null);
create policy partners_admin_write on public.partners for all using (public.is_admin()) with check (public.is_admin());
create policy documents_owner_all on public.documents for all using (public.owns_company(company_id)) with check (public.owns_company(company_id));
create policy deadlines_owner_all on public.deadlines for all using (public.owns_company(company_id)) with check (public.owns_company(company_id));
create policy subscriptions_owner_read on public.subscriptions for select using (public.owns_company(company_id) or public.is_admin());
create policy referrals_client_read on public.referrals for select using (public.owns_company(company_id) or public.is_admin() or exists(select 1 from public.partners p where p.id = partner_id and p.profile_id = auth.uid()));
create policy referrals_admin_write on public.referrals for all using (public.is_admin()) with check (public.is_admin());
create policy support_owner_read on public.support_tickets for select using (user_id = auth.uid() or public.is_admin());
create policy audit_admin_read on public.audit_logs for select using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('compliance-documents', 'compliance-documents', false, 10485760, array['application/pdf','image/jpeg','image/png','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
on conflict (id) do nothing;

create policy documents_storage_select on storage.objects for select using (
  bucket_id = 'compliance-documents' and (storage.foldername(name))[1] = auth.uid()::text
);
create policy documents_storage_insert on storage.objects for insert with check (
  bucket_id = 'compliance-documents' and (storage.foldername(name))[1] = auth.uid()::text
);
create policy documents_storage_delete on storage.objects for delete using (
  bucket_id = 'compliance-documents' and (storage.foldername(name))[1] = auth.uid()::text
);

insert into public.countries (code, slug, name, active) values
('AT','austria','Austria',false),('BE','belgium','Belgium',false),('BG','bulgaria','Bulgaria',false),
('HR','croatia','Croatia',false),('CY','cyprus','Cyprus',false),('CZ','czechia','Czechia',false),
('DK','denmark','Denmark',false),('EE','estonia','Estonia',false),('FI','finland','Finland',false),
('FR','france','France',true),('DE','germany','Germany',true),('GR','greece','Greece',false),
('HU','hungary','Hungary',false),('IE','ireland','Ireland',false),('IT','italy','Italy',true),
('LV','latvia','Latvia',false),('LT','lithuania','Lithuania',false),('LU','luxembourg','Luxembourg',false),
('MT','malta','Malta',false),('NL','netherlands','Netherlands',false),('PL','poland','Poland',false),
('PT','portugal','Portugal',false),('RO','romania','Romania',false),('SK','slovakia','Slovakia',false),
('SI','slovenia','Slovenia',false),('ES','spain','Spain',false),('SE','sweden','Sweden',false)
on conflict (code) do nothing;
