import { Home, Users, Settings, Gift, Link2, BarChart } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"

// Accept user as a prop
export function AppSidebar({ user }: { user: any }) {
  const location = useLocation();
  const items = [
    {
      title: "All Brands",
      url: "/",
      icon: Home,
    },
    {
      title: "Collaboration Status",
      url: "/collaboration",
      icon: BarChart,
    },
    {
      title: "Coupon",
      url: "/coupon",
      icon: Gift,
    },
    {
      title: "Affiliate",
      url: "/affiliate",
      icon: Link2,
    },
    // Remove Settings from here
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
                    isActive={location.pathname === item.url}
                    className={location.pathname === item.url ? 'font-medium' : ''}
                    style={location.pathname === item.url ? { color: 'var(--primary)' } : {}}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
              isActive={location.pathname === "/settings"}
              className={location.pathname === "/settings" ? 'font-medium' : ''}
              style={location.pathname === "/settings" ? { color: 'var(--primary)' } : {}}
            >
              <a href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
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
              <span className="font-medium text-sm truncate">{user.displayName || "User"}</span>
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
} 