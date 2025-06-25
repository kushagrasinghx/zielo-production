import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BrandSidebar } from "@/components/brand-sidebar"
import { NotificationDropdown } from "@/components/NotificationDropdown"
import { useLocation } from "react-router-dom"
import { brands } from './data/brands';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function Layout({ children, user }: { children: React.ReactNode, user: any }) {
  const location = useLocation();
  const pageName = location.pathname === "/" ? "Brands" : 
    location.pathname.slice(1).split("/")[0].split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full max-w-full overflow-x-hidden">
        <AppSidebar user={user} />
        <main className="flex-1 flex flex-col p-6 min-h-0 w-full max-w-full overflow-x-hidden">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="cursor-pointer"/>
              <h1 className="text-2sm font-medium text-sidebar-foreground">{pageName}</h1>
            </div>
            <NotificationDropdown />
          </div>
          <div className="flex-1 min-h-0 flex flex-col w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export function BrandLayout({ children, user }: { children: React.ReactNode, user: any }) {
  const location = useLocation();
  let pageName: string;
  const campaignMatch = location.pathname.match(/^\/brand-campaigns\/([^/]+)\/(\d+)/);
  if (campaignMatch) {
    const brandSlug = campaignMatch[1];
    // Find the actual brand name from the brands data
    const brand = brands.find(b => slugify(b.name) === brandSlug);
    pageName = brand ? `${brand.name} Analytics` : 'Campaign Analytics';
  } else if (location.pathname === '/brand-campaigns') {
    pageName = 'My Campaigns';
  } else {
    pageName = location.pathname === "/" || location.pathname === "/brand-dashboard" ? "Dashboard" : 
      location.pathname.slice(1).split("/")[0].replace("brand-", "").split("-").map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" ");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full max-w-full overflow-x-hidden">
        <BrandSidebar user={user} />
        <main className="flex-1 flex flex-col p-6 min-h-0 w-full max-w-full overflow-x-hidden">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="cursor-pointer"/>
              <h1 className="text-2sm font-medium text-sidebar-foreground">{pageName}</h1>
            </div>
            <NotificationDropdown />
          </div>
          <div className="flex-1 min-h-0 flex flex-col w-full max-w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 