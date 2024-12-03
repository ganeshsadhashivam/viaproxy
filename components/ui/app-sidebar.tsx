import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Users,
  MessageSquare,
  AlertTriangle,
  File,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "User Management",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];
const items = [
  { title: "Dashboard", url: "/dashboard/admin", icon: Home },
  { title: "User Management", url: "/dashboard/admin/users", icon: Users },
  { title: "Trade Management", url: "/dashboard/admin/trades", icon: File },
  {
    title: "Donation Management",
    url: "/dashboard/admin/donations",
    icon: File,
  },
  { title: "Sales Management", url: "/dashboard/admin/sales", icon: File },
  { title: "Messages", url: "/dashboard/admin/messages", icon: MessageSquare },
  { title: "Alerts", url: "/dashboard/admin/alerts", icon: AlertTriangle },
  {
    title: "Platform Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ViaProxy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className="flex flex-col justify-evenly p-2"
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
        <Image
          src="/christian.jpg"
          width={75}
          height={50}
          alt="logo"
          className="rounded-3xl"
        />
      </SidebarFooter>
    </Sidebar>
  );
}

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "@/components/ui/sidebar";

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarHeader />
//       <SidebarContent>
//         <SidebarGroup />
//         <SidebarGroup />
//       </SidebarContent>
//       <SidebarFooter />
//     </Sidebar>
//   );
// }
