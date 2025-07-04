import { Home, Settings, Gift, Link2, BarChart, UserPlus, Clipboard } from "lucide-react"
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
import { useLocation, Link } from "react-router-dom"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
import InviteCreatorDialog from "./InviteCreatorDialog";

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
      title: "Redeem Coupons",
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
        {/* Invite Creator Dialog above Settings */}
        <InviteCreatorDialog
          trigger={
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span className="flex items-center cursor-pointer">
                    <UserPlus className="h-4 w-4" />
                    <span>Invite Creator</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          }
        />
        {/* Settings button at the bottom */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname === "/settings"}
              className={location.pathname === "/settings" ? 'font-medium' : ''}
              style={location.pathname === "/settings" ? { color: 'var(--primary)' } : {}}
            >
              <Link to="/settings">
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
              <span className="font-medium text-sm truncate">{user.displayName || "User"}</span>
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

function CopyInviteButton() {
  const [copied, setCopied] = useState(false);
  const link = 'https://zielo.app/invite/creator';
  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="transition-all"
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
} 