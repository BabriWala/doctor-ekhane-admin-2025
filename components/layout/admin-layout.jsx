"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

export function AdminLayout({ children, className }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className={cn("transition-all duration-300", sidebarCollapsed ? "w-16" : "w-64")} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-auto">
          <Container className={cn("py-6", className)}>{children}</Container>
        </main>
      </div>
    </div>
  )
}
