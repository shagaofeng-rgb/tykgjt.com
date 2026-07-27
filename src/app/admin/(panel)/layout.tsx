import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await requireAdminSession();
  return <AdminShell email={session.email}>{children}</AdminShell>;
}
