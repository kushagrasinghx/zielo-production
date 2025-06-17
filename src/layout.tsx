import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useLocation } from "react-router-dom"

export default function Layout({ children, user }: { children: React.ReactNode, user: any }) {
  const location = useLocation();
  const pageName = location.pathname === "/" ? "Brands" : 
    location.pathname.slice(1).split("/")[0].split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar user={user} />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger className="cursor-pointer"/>
            <h1 className="text-2sm font-medium text-sidebar-foreground">{pageName}</h1>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
} 