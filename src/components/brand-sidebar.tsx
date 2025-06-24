import { Home, BarChart, Link2, Briefcase, Wallet, Settings, Shuffle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";

export function BrandSidebar({ user }: { user: any }) {
  const location = useLocation();
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: (pathname: string) => pathname === '/' || pathname === '/brand-dashboard',
    },
    {
      title: "Your Campaigns",
      url: "/brand/campaigns",
      icon: Briefcase,
    },
    {
      title: "Brand Analytics",
      url: "/brand/analytics",
      icon: BarChart,
    },
    {
      title: "Barter",
      url: "/brand-barter",
      icon: Shuffle,
    },
    {
      title: "Affiliates",
      url: "/brand-affiliate",
      icon: Link2,
    },
    {
      title: "Brand Wallet",
      url: "/brand-wallet",
      icon: Wallet,
    },
  ];

  return (
    <Sidebar>
      <div className="flex items-center gap-2 px-4 py-5">
        <img src="/logo.png" alt="Zielo Logo" className="w-7 h-7" />
        <span className="font-bold text-lg tracking-tight">Zielo</span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive ? item.isActive(location.pathname) : location.pathname === item.url}
                    className={(item.isActive ? item.isActive(location.pathname) : location.pathname === item.url) ? 'font-medium' : ''}
                    style={(item.isActive ? item.isActive(location.pathname) : location.pathname === item.url) ? { color: 'var(--primary)' } : {}}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Settings button at the bottom */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === "/brand-settings"}
              className={location.pathname === "/brand-settings" ? 'font-medium' : ''}
              style={location.pathname === "/brand-settings" ? { color: 'var(--primary)' } : {}}
            >
              <Link to="/brand-settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* Profile section */}
        {user && (
          <div className="flex items-center gap-3 mt-4 p-2 rounded-md">
            <img
              src={user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
              alt={user.displayName || user.email}
              className="w-8 h-8 rounded-full object-cover"
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'; }}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-sm truncate">{user.displayName || "Brand User"}</span>
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
} 