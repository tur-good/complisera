create schema if not exists private;

alter function public.handle_new_user() set schema private;
alter function public.is_admin() set schema private;
alter function public.owns_company(uuid) set schema private;

revoke all on schema private from public;
grant usage on schema private to authenticated;

revoke all on function private.handle_new_user() from public, anon, authenticated;
revoke all on function private.is_admin() from public, anon;
revoke all on function private.owns_company(uuid) from public, anon;
grant execute on function private.is_admin() to authenticated;
grant execute on function private.owns_company(uuid) to authenticated;

create policy login_waitlist_admin_read on public.login_waitlist
for select using (private.is_admin());
