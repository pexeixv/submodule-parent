import { type ReactNode } from "react"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import TwSizeIndicator from "@/components/TwSizeIndicator"
import Sidebar, { type SidebarLink } from "@/components/Sidebar"
import { HomeIcon, RouteIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: ReactNode
  hasHeader?: boolean
  hasFooter?: boolean
  hasPadding?: boolean
  hasSidebar?: boolean
}

const menuItems: SidebarLink[] = [
  { url: "/", icon: HomeIcon, text: "Dashboard" },
  { url: "#", icon: UserIcon, text: "Patients" },
  { url: "#", icon: RouteIcon, text: "Journeys" },
]

export default function BaseLayout({
  children,
  hasHeader = true,
  hasFooter = true,
  hasPadding = true,
  hasSidebar = true,
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <TwSizeIndicator />
      {hasHeader && <Header />}
      <main className="flex flex-1">
        {hasSidebar && <Sidebar links={menuItems} />}
        <div
          className={cn("flex-1  overflow-x-hidden", {
            "p-8 max-md:ml-10": hasPadding,
          })}
        >
          {children}
        </div>
      </main>
      {hasFooter && <Footer />}
    </div>
  )
}
