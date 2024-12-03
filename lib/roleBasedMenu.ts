import {
  Home,
  Users,
  TrendingUp,
  Gift,
  ShoppingCart,
  Bell,
  MessageCircle,
  BookOpen,
  HelpCircle,
  User,
} from "lucide-react";

export const roleNavigation = {
  admin: [
    { label: "Dashboard", path: "/dashboard/admin", icon: Home },
    { label: "User Management", path: "/dashboard/admin/users", icon: Users },
    {
      label: "Trade Management",
      path: "/dashboard/admin/trades",
      icon: TrendingUp,
    },
    {
      label: "Donation Management",
      path: "/dashboard/admin/donations",
      icon: Gift,
    },
    {
      label: "Sales Management",
      path: "/dashboard/admin/sales",
      icon: ShoppingCart,
    },
    { label: "Alerts", path: "/dashboard/admin/alerts", icon: Bell },
  ],
  student: [
    {
      label: "MyCampusClub",
      icon: MessageCircle,
      children: [
        {
          label: "Messaging",
          path: "/dashboard/student/messages",
          icon: MessageCircle,
        },
        {
          label: "Campus Blog",
          path: "/dashboard/student/blog",
          icon: BookOpen,
        },
      ],
    },
    {
      label: "Exchange Market",
      icon: TrendingUp,
      children: [
        {
          label: "How It Works",
          path: "/dashboard/student/howitworks",
          icon: HelpCircle,
        },
        {
          label: "Exchange Management",
          icon: TrendingUp,
          children: [
            {
              label: "Find an Exchange Offer",
              path: "/dashboard/student/exchanges/find",
              icon: TrendingUp,
            },
            {
              label: "Submit an Exchange Offer",
              path: "/dashboard/student/exchanges/createexchange",
              icon: TrendingUp,
              children: [
                {
                  label: "Exchange Product for a Product",
                  path: "/dashboard/student/exchanges/productforproduct",
                  icon: TrendingUp,
                },
                {
                  label: "Exchange Product for a Service",
                  path: "/dashboard/student/productforservice",
                  icon: TrendingUp,
                },
                {
                  label: "Exchange Service for a Service",
                  path: "/dashboard/student/serviceforservice",
                  icon: TrendingUp,
                },
                {
                  label: "Exchange Service for a Product",
                  path: "/dashboard/student/serviceforproduct",
                  icon: TrendingUp,
                },
              ],
            },
            {
              label: "My Exchange Offers",
              path: "/dashboard/student/exchanges/myexchanges",
              icon: Gift,
            },
          ],
        },
        {
          label: "My Exchange Transactions",
          icon: ShoppingCart,
          children: [
            {
              label: "Ongoing Exchanges",
              path: "/dashboard/student/exchanges/ongoingexchanges",
              icon: ShoppingCart,
            },
            {
              label: "Exchanges Carried Out",
              path: "/dashboard/student/exchanges/exchangescarriedout",
              icon: ShoppingCart,
            },
            {
              label: "Proposals Received",
              path: "/dashboard/student/exchanges/proposalreceived",
              icon: Bell,
            },
          ],
        },
      ],
    },
    { label: "My Donations", path: "/dashboard/student/donations", icon: Gift },
    { label: "My Sales", path: "/dashboard/student/sales", icon: ShoppingCart },
    {
      label: "Help & Support",
      path: "/dashboard/student/support",
      icon: HelpCircle,
    },
    { label: "Profile", path: "/dashboard/student/profile", icon: User },
  ],
};

// export const roleNavigation = {
//   admin: [
//     { label: "Dashboard", path: "/dashboard/admin" },
//     { label: "User Management", path: "/dashboard/admin/users" },
//     { label: "Trade Management", path: "/dashboard/admin/trades" },
//     { label: "Donation Management", path: "/dashboard/admin/donations" },
//     { label: "Sales Management", path: "/dashboard/admin/sales" },
//     { label: "Alerts", path: "/dashboard/admin/alerts" },
//   ],
//   student: [
//     {
//       label: "MyCampusClub",
//       children: [
//         { label: "Messaging", path: "/dashboard/student/messages" },
//         { label: "Campus Blog", path: "/dashboard/student/blog" },
//       ],
//     },
//     {
//       label: "Exchange Market",
//       children: [
//         {
//           label: "How It Works",
//           path: "/dashboard/student/howitworks",
//         },
//         {
//           label: "Exchange Management",
//           children: [
//             {
//               label: "Find an Exchange Offer",
//               path: "/dashboard/student/exchanges/find",
//             },
//             {
//               label: "Submit an Exchange Offer",
//               path: "/dashboard/student/exchanges/createexchange",
//               children: [
//                 {
//                   label: "Exchange Product for a Product",
//                   path: "/dashboard/student/exchanges/productforproduct",
//                 },
//                 {
//                   label: "Exchange Product for a Service",
//                   path: "/dashboard/student/productforservice",
//                 },
//                 {
//                   label: "Exchange Service for a Service",
//                   path: "/dashboard/student/serviceforservice",
//                 },
//                 {
//                   label: "Exchange Service for a Product",
//                   path: "/dashboard/student/serviceforproduct",
//                 },
//               ],
//             },
//             {
//               label: "My Exchange Offers",
//               path: "/dashboard/student/exchanges/myexchanges",
//             },
//           ],
//         },
//         {
//           label: "My Exchange Transactions",
//           children: [
//             {
//               label: "Ongoing Exchanges",
//               path: "/dashboard/student/exchanges/ongoingexchanges",
//             },
//             {
//               label: "Exchanges Carried Out",
//               path: "/dashboard/student/exchanges/exchangescarriedout",
//             },
//             {
//               label: "Proposals Received",
//               path: "/dashboard/student/exchanges/proposalreceived",
//             },
//           ],
//         },
//       ],
//     },
//     { label: "My Donations", path: "/dashboard/student/donations" },
//     { label: "My Sales", path: "/dashboard/student/sales" },
//     { label: "Help & Support", path: "/dashboard/student/support" },
//     { label: "Profile", path: "/dashboard/student/profile" },
//   ],
// };
