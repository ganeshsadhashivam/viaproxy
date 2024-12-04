"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
// import { Sidebar } from "@/app/components/layout/Sidebar";

import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Provider store={store}>
    <div className="flex h-screen ">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className="m-1 w-dvw">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>

      {/* Main Content */}
      {/* <main className="flex-1 p-6 bg-gray-100">{children}</main> */}
    </div>
    // </Provider>
  );
}

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/ui/app-sidebar";
// import { NextUIProvider } from "@nextui-org/system";
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <NextUIProvider>
//       <SidebarProvider>
//         <AppSidebar />
//         <main>
//           <SidebarTrigger />
//           {children}
//         </main>
//       </SidebarProvider>
//     </NextUIProvider>
//   );
// }
