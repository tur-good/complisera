import { requireUser } from "../../lib/auth";
import { DashboardView } from "../dashboard-view";

export const dynamic = "force-dynamic";

export default async function Page(){
  const user=await requireUser("/dashboard");
  const firstName=String(user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Seller").split(" ")[0];
  return <DashboardView displayName={firstName}/>;
}
