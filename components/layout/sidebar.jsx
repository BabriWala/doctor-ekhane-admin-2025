"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Calendar,
  FileText,
  Settings,
  Menu,
  Component,
  X,
  Home,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Doctors", href: "/admin/doctors", icon: Component },
  { name: "Hospitals", href: "/admin/hospitals", icon: Component },
  { name: "Blood Donors", href: "/admin/blood-donors", icon: Component },
  { name: "Ambulances", href: "/admin/ambulances", icon: Component },
  // { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  // {
  //   name: "Visa Applications",
  //   href: "/admin/visa-applications",
  //   icon: FileText,
  // },
  // { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ className }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full bg-card border-r", className)}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h2 className="text-lg font-semibold">Admin Panel</h2>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <Separator />

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start", collapsed && "px-2")}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="ml-2">{item.name}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
