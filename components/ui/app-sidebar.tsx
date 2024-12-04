// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//   } from "@/components/ui/sidebar";
//   import Image from "next/image";
//   import { useSelector, useDispatch } from "react-redux";
//   import { useState } from "react";
//   import { useRouter } from "next/navigation";
//   import { roleNavigation } from "@/lib/roleNavigation"; // Import your roleNavigation configuration
//   import { logout } from "@/store/slices/authSlice"; // Redux action for logging out

//   export function AppSidebar() {
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const userRole = useSelector((state: any) => state.auth.userRole);
//     const navigationItems = roleNavigation[userRole] || [];

//     const [showProfileMenu, setShowProfileMenu] = useState(false);
//     const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar
//     const [expandedMenus, setExpandedMenus] = useState<{
//       [key: string]: boolean;
//     }>({});

//     const handleLogout = () => {
//       dispatch(logout()); // Clear user data from Redux
//       router.push("/authentication/login"); // Redirect to login page
//     };

//     const toggleMenu = (label: string) => {
//       setExpandedMenus((prev) => ({
//         ...prev,
//         [label]: !prev[label],
//       }));
//     };

//     return (
//       <Sidebar
//         className={`transition-all duration-300 ${
//           isCollapsed ? "w-16" : "w-64"
//         } bg-gray-900 text-white`}
//       >
//         <SidebarContent>
//           {/* Collapse Button */}
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-2 m-2 text-gray-500 hover:text-blue-500 focus:outline-none"
//           >
//             {isCollapsed ? ">" : "<"}
//           </button>

//           {/* Sidebar Content */}
//           <SidebarGroup>
//             <SidebarGroupLabel>
//               {!isCollapsed && <span>ViaProxy</span>}
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {navigationItems.map((item) => (
//                   <SidebarMenuItem
//                     key={item.label}
//                     className="group/menu-item relative flex flex-col justify-evenly p-2"
//                   >
//                     <SidebarMenuButton asChild>
//                       <div
//                         className="flex items-center gap-2 cursor-pointer"
//                         onClick={() => toggleMenu(item.label)}
//                       >
//                         <item.icon className="w-5 h-5" />
//                         <span
//                           className={`transition-opacity duration-300 ${
//                             isCollapsed ? "opacity-0 w-0" : "opacity-100"
//                           }`}
//                         >
//                           {item.label}
//                         </span>
//                         {!isCollapsed && item.children && (
//                           <span className="ml-auto">
//                             {expandedMenus[item.label] ? "-" : "+"}
//                           </span>
//                         )}
//                       </div>
//                     </SidebarMenuButton>

//                     {/* Render Children */}
//                     {item.children && expandedMenus[item.label] && (
//                       <div className="ml-4">
//                         <ul className="space-y-2">
//                           {item.children.map((child) => (
//                             <li key={child.label}>
//                               <div
//                                 className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-blue-400"
//                                 onClick={() => toggleMenu(child.label)}
//                               >
//                                 {child.icon && <child.icon className="w-4 h-4" />}
//                                 <span
//                                   className={`transition-opacity duration-300 ${
//                                     isCollapsed ? "opacity-0 w-0" : "opacity-100"
//                                   }`}
//                                 >
//                                   {child.label}
//                                 </span>
//                                 {!isCollapsed && child.children && (
//                                   <span className="ml-auto">
//                                     {expandedMenus[child.label] ? "-" : "+"}
//                                   </span>
//                                 )}
//                               </div>

//                               {/* Render Grandchildren */}
//                               {child.children && expandedMenus[child.label] && (
//                                 <ul className="ml-4 space-y-1">
//                                   {child.children.map((grandChild) => (
//                                     <li key={grandChild.label}>
//                                       <a
//                                         href={grandChild.path}
//                                         className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-300"
//                                       >
//                                         {grandChild.icon && (
//                                           <grandChild.icon className="w-3 h-3" />
//                                         )}
//                                         <span
//                                           className={`transition-opacity duration-300 ${
//                                             isCollapsed
//                                               ? "opacity-0 w-0"
//                                               : "opacity-100"
//                                           }`}
//                                         >
//                                           {grandChild.label}
//                                         </span>
//                                       </a>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>

//         {/* Sidebar Footer */}
//         <SidebarFooter className="relative">
//           <div className="flex items-center justify-center">
//             {/* Profile Avatar */}
//             <button
//               onClick={() => setShowProfileMenu((prev) => !prev)}
//               className="relative focus:outline-none"
//             >
//               <Image
//                 src="/christian.jpg"
//                 width={50}
//                 height={50}
//                 alt="User Avatar"
//                 className="rounded-full border-2 border-gray-300 hover:border-blue-500"
//               />
//             </button>
//           </div>
//           {/* Profile Dropdown Menu */}
//           {showProfileMenu && (
//             <div
//               className={`absolute bottom-full left-0 mb-2 w-40 bg-white text-black rounded-md shadow-lg z-10 transition-all ${
//                 isCollapsed ? "ml-16" : "ml-0"
//               }`}
//             >
//               <button
//                 onClick={handleLogout}
//                 className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </SidebarFooter>
//       </Sidebar>
//     );
//   }

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { roleNavigation } from "@/lib/roleNavigation"; // Import your roleNavigation configuration
// import { logout } from "@/store/slices/authSlice"; // Redux action for logging out

// export function AppSidebar() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const userRole = useSelector((state: any) => state.auth.userRole);
//   const navigationItems = roleNavigation[userRole] || [];

//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar
//   const [expandedMenus, setExpandedMenus] = useState<{
//     [key: string]: boolean;
//   }>({});

//   const handleLogout = () => {
//     dispatch(logout()); // Clear user data from Redux
//     router.push("/authentication/login"); // Redirect to login page
//   };

//   const toggleMenu = (label: string) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   return (
//     <Sidebar
//       className={`transition-all duration-300 ${
//         isCollapsed ? "w-16" : "w-64"
//       } bg-gray-900 text-white`}
//     >
//       <SidebarContent>
//         {/* Collapse Button */}
//         <button
//           onClick={() => setIsCollapsed(!isCollapsed)}
//           className="p-2 m-2 text-gray-500 hover:text-blue-500 focus:outline-none"
//         >
//           {isCollapsed ? ">" : "<"}
//         </button>

//         {/* Sidebar Content */}
//         <SidebarGroup>
//           <SidebarGroupLabel>{!isCollapsed && "ViaProxy"}</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem
//                   key={item.label}
//                   className="group/menu-item relative flex flex-col justify-evenly p-2"
//                 >
//                   <SidebarMenuButton asChild>
//                     <div
//                       className="flex items-center gap-2 cursor-pointer"
//                       onClick={() => toggleMenu(item.label)}
//                     >
//                       <item.icon className="w-5 h-5" />
//                       {!isCollapsed && <span>{item.label}</span>}
//                       {!isCollapsed && item.children && (
//                         <span className="ml-auto">
//                           {expandedMenus[item.label] ? "-" : "+"}
//                         </span>
//                       )}
//                     </div>
//                   </SidebarMenuButton>

//                   {/* Render Children */}
//                   {item.children && expandedMenus[item.label] && (
//                     <div className="ml-4">
//                       <ul className="space-y-2">
//                         {item.children.map((child) => (
//                           <li key={child.label}>
//                             <div
//                               className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-blue-400"
//                               onClick={() => toggleMenu(child.label)}
//                             >
//                               {child.icon && <child.icon className="w-4 h-4" />}
//                               {!isCollapsed && <span>{child.label}</span>}
//                               {!isCollapsed && child.children && (
//                                 <span className="ml-auto">
//                                   {expandedMenus[child.label] ? "-" : "+"}
//                                 </span>
//                               )}
//                             </div>

//                             {/* Render Grandchildren */}
//                             {child.children && expandedMenus[child.label] && (
//                               <ul className="ml-4 space-y-1">
//                                 {child.children.map((grandChild) => (
//                                   <li key={grandChild.label}>
//                                     <a
//                                       href={grandChild.path}
//                                       className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-300"
//                                     >
//                                       {grandChild.icon && (
//                                         <grandChild.icon className="w-3 h-3" />
//                                       )}
//                                       {!isCollapsed && (
//                                         <span>{grandChild.label}</span>
//                                       )}
//                                     </a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* Sidebar Footer */}
//       <SidebarFooter className="relative">
//         <div className="flex items-center justify-center">
//           {/* Profile Avatar */}
//           <button
//             onClick={() => setShowProfileMenu((prev) => !prev)}
//             className="relative focus:outline-none"
//           >
//             <Image
//               src="/christian.jpg"
//               width={50}
//               height={50}
//               alt="User Avatar"
//               className="rounded-full border-2 border-gray-300 hover:border-blue-500"
//             />
//           </button>
//         </div>
//         {/* Profile Dropdown Menu */}
//         {showProfileMenu && (
//           <div
//             className={`absolute bottom-full left-0 mb-2 w-40 bg-white text-black rounded-md shadow-lg z-10 transition-all ${
//               isCollapsed ? "ml-16" : "ml-0"
//             }`}
//           >
//             <button
//               onClick={handleLogout}
//               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

//collapsible sb
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
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { roleNavigation } from "@/lib/roleNavigation"; // Import your roleNavigation configuration
import { logout } from "@/store/slices/authSlice"; // Redux action for logging out

export function AppSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userRole = useSelector((state: any) => state.auth.userRole);
  const navigationItems = roleNavigation[userRole] || [];

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State for collapsing sidebar

  const handleLogout = () => {
    dispatch(logout()); // Clear user data from Redux
    router.push("/authentication/login"); // Redirect to login page
  };

  return (
    <Sidebar
      className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <SidebarContent>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 m-2 text-gray-500 hover:text-blue-500 focus:outline-none"
        >
          {isCollapsed ? ">" : "<"}
        </button>
        <SidebarGroup>
          <SidebarGroupLabel>{!isCollapsed && "ViaProxy"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item: any) => (
                <SidebarMenuItem
                  key={item.label}
                  className="group/menu-item relative flex flex-col justify-evenly p-2"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.path} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </a>
                  </SidebarMenuButton>
                  {item.children && (
                    <div className="ml-4">
                      <ul className="space-y-2">
                        {item.children.map((child: any) => (
                          <li key={child.label}>
                            <a
                              href={child.path}
                              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
                            >
                              {child.icon && <child.icon className="w-4 h-4" />}
                              {!isCollapsed && <span>{child.label}</span>}
                            </a>
                            {child.children && (
                              <ul className="ml-4 space-y-1">
                                {child.children.map((grandChild: any) => (
                                  <li key={grandChild.label}>
                                    <a
                                      href={grandChild.path}
                                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-500"
                                    >
                                      {grandChild.icon && (
                                        <grandChild.icon className="w-3 h-3" />
                                      )}
                                      {!isCollapsed && (
                                        <span>{grandChild.label}</span>
                                      )}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="relative">
        <div className="flex items-center justify-center">
          {/* Profile Avatar */}
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="relative focus:outline-none"
          >
            <Image
              src="/christian.jpg"
              width={75}
              height={50}
              alt="User Avatar"
              className="rounded-full border-2 border-gray-300 hover:border-blue-500"
            />
          </button>
        </div>
        {/* Profile Dropdown Menu */}
        {showProfileMenu && (
          <div
            className={`absolute bottom-full left-0 mb-2 w-40 bg-white rounded-md shadow-lg z-10 transition-all ${
              isCollapsed ? "ml-16" : "ml-0"
            }`}
          >
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

// achieved sidebar
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { roleNavigation } from "@/lib/roleNavigation"; // Import your roleNavigation configuration
// import { logout } from "@/store/slices/authSlice"; // Redux action for logging out

// export function AppSidebar() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const userRole = useSelector((state: any) => state.auth.role);
//   const navigationItems = roleNavigation[userRole] || [];

//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const handleLogout = () => {
//     dispatch(logout()); // Clear user data from Redux
//     router.push("/authentication/login"); // Redirect to login page
//   };

//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>ViaProxy</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem
//                   key={item.label}
//                   className="group/menu-item relative flex flex-col justify-evenly p-2"
//                 >
//                   <SidebarMenuButton asChild>
//                     <a href={item.path} className="flex items-center gap-2">
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </a>
//                   </SidebarMenuButton>
//                   {item.children && (
//                     <div className="ml-4">
//                       <ul className="space-y-2">
//                         {item.children.map((child) => (
//                           <li key={child.label}>
//                             <a
//                               href={child.path}
//                               className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
//                             >
//                               {child.icon && <child.icon className="w-4 h-4" />}
//                               <span>{child.label}</span>
//                             </a>
//                             {child.children && (
//                               <ul className="ml-4 space-y-1">
//                                 {child.children.map((grandChild) => (
//                                   <li key={grandChild.label}>
//                                     <a
//                                       href={grandChild.path}
//                                       className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-500"
//                                     >
//                                       {grandChild.icon && (
//                                         <grandChild.icon className="w-3 h-3" />
//                                       )}
//                                       <span>{grandChild.label}</span>
//                                     </a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="relative">
//         <div className="flex items-center justify-center">
//           {/* Profile Avatar */}
//           <button
//             onClick={() => setShowProfileMenu((prev) => !prev)}
//             className="relative focus:outline-none"
//           >
//             <Image
//               src="/christian.jpg"
//               width={75}
//               height={50}
//               alt="User Avatar"
//               className="rounded-3xl border-2 border-gray-300 hover:border-blue-500"
//             />
//           </button>
//         </div>
//         {/* Profile Dropdown Menu */}
//         {showProfileMenu && (
//           <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-md shadow-lg z-10">
//             <button
//               onClick={handleLogout}
//               className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import { useSelector } from "react-redux";
// import { roleNavigation } from "@/lib/roleNavigation"; // Import your roleNavigation configuration

// export function AppSidebar() {
//   // Get user role from Redux store
//   const userRole = useSelector((state: any) => state.auth.userRole);
//   const navigationItems = roleNavigation[userRole] || [];

//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>ViaProxy</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem
//                   key={item.label}
//                   className="group/menu-item relative flex flex-col justify-evenly p-2"
//                 >
//                   <SidebarMenuButton asChild>
//                     <a href={item.path} className="flex items-center gap-2">
//                       <item.icon className="w-5 h-5" />
//                       <span>{item.label}</span>
//                     </a>
//                   </SidebarMenuButton>
//                   {/* Render nested children if they exist */}
//                   {item.children && (
//                     <div className="ml-4">
//                       <ul className="space-y-2">
//                         {item.children.map((child) => (
//                           <li key={child.label}>
//                             <a
//                               href={child.path}
//                               className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
//                             >
//                               {child.icon && <child.icon className="w-4 h-4" />}
//                               <span>{child.label}</span>
//                             </a>
//                             {/* Render deeper nested children if they exist */}
//                             {child.children && (
//                               <ul className="ml-4 space-y-1">
//                                 {child.children.map((grandChild) => (
//                                   <li key={grandChild.label}>
//                                     <a
//                                       href={grandChild.path}
//                                       className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-500"
//                                     >
//                                       {grandChild.icon && (
//                                         <grandChild.icon className="w-3 h-3" />
//                                       )}
//                                       <span>{grandChild.label}</span>
//                                     </a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <Image
//           src="/christian.jpg"
//           width={75}
//           height={50}
//           alt="logo"
//           className="rounded-3xl"
//         />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import { roleNavigation } from "@/lib/roleNavigation";

// export function AppSidebar() {
//   const userRole = useSelector((state: RootState) => state.auth.userRole); // Access userRole from Redux

//   // Get navigation items based on user role
//   const navigationItems = roleNavigation[userRole || ""] || [];

//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>ViaProxy</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem
//                   className="flex flex-col justify-evenly p-2"
//                   key={item.label}
//                 >
//                   <SidebarMenuButton asChild>
//                     <a href={item.path}>
//                       <item.icon className="w-5 h-5 mr-2" />
//                       <span>{item.label}</span>
//                     </a>
//                   </SidebarMenuButton>
//                   {/* Render children if present */}
//                   {item.children && (
//                     <div className="ml-4">
//                       {item.children.map((child) => (
//                         <SidebarMenuItem key={child.label}>
//                           <SidebarMenuButton asChild>
//                             <a href={child.path}>
//                               <child.icon className="w-4 h-4 mr-2" />
//                               <span>{child.label}</span>
//                             </a>
//                           </SidebarMenuButton>
//                         </SidebarMenuItem>
//                       ))}
//                     </div>
//                   )}
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <Image
//           src="/christian.jpg"
//           width={75}
//           height={50}
//           alt="logo"
//           className="rounded-3xl"
//         />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

// import {
//   Calendar,
//   Home,
//   Inbox,
//   Search,
//   Settings,
//   Users,
//   MessageSquare,
//   AlertTriangle,
//   File,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Image from "next/image";

// // Menu items.
// // const items = [
// //   {
// //     title: "Home",
// //     url: "#",
// //     icon: Home,
// //   },
// //   {
// //     title: "User Management",
// //     url: "#",
// //     icon: Inbox,
// //   },
// //   {
// //     title: "Calendar",
// //     url: "#",
// //     icon: Calendar,
// //   },
// //   {
// //     title: "Search",
// //     url: "#",
// //     icon: Search,
// //   },
// //   {
// //     title: "Settings",
// //     url: "#",
// //     icon: Settings,
// //   },
// // ];
// const items = [
//   { title: "Dashboard", url: "/dashboard/admin", icon: Home },
//   { title: "User Management", url: "/dashboard/admin/users", icon: Users },
//   { title: "Trade Management", url: "/dashboard/admin/trades", icon: File },
//   {
//     title: "Donation Management",
//     url: "/dashboard/admin/donations",
//     icon: File,
//   },
//   { title: "Sales Management", url: "/dashboard/admin/sales", icon: File },
//   { title: "Messages", url: "/dashboard/admin/messages", icon: MessageSquare },
//   { title: "Alerts", url: "/dashboard/admin/alerts", icon: AlertTriangle },
//   {
//     title: "Platform Settings",
//     url: "/dashboard/admin/settings",
//     icon: Settings,
//   },
// ];

// export function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>ViaProxy</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem
//                   className="flex flex-col justify-evenly p-2"
//                   key={item.title}
//                 >
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <Image
//           src="/christian.jpg"
//           width={75}
//           height={50}
//           alt="logo"
//           className="rounded-3xl"
//         />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

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
