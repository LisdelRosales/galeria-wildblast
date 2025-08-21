import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Navigation } from "@/components/navigation"
import { AdminPanel } from "@/components/admin/admin-panel"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <AdminPanel />
        </div>
      </div>
    </div>
  )
}
