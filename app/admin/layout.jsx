// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { AuthGuard } from "@/components/auth/auth-guard"
import { AdminLayout } from "@/components/layout/admin-layout"

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel dashboard",
}

export default function AdminLayoutWrapper({ children }) {
  return (
    <AuthGuard requireAdmin={true}>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  )
}
