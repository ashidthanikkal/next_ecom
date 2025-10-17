"use client";

import React from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"; // Adjust import path

import { Home, Users, BoxIcon, ListOrdered, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Products",
      url: "/products",
      icon: BoxIcon,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Order",
      url: "/orders",
      icon: ListOrdered,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  // Define titles for each route
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/users": "Users",
    "/settings": "Settings",
    "/products": "Products",
    "/orders": "Orders",
    "/": "Login",
  };

  // Pick the title or fallback
  const title = titles[pathname] || "Page";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <h1 className="text-[40px] font-bold px-2 bg-gradient-to-r from-[#092514] via-[#006f6c] to-[#00b8b1] text-transparent bg-clip-text">
              Zero.com
            </h1>
          </SidebarHeader>

          <SidebarSeparator className="mx-0" />

          <SidebarContent>
            <SidebarGroup className="h-full">
              {/* <SidebarGroupLabel>Main</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `${item.url}`}
                        size={"lg"}
                      >
                        <Link href={`${item.url}`}>
                          <item.icon className="mr-2" />{" "}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
              <SidebarFooter className="mt-auto mb-4 px-4">
                <div className="text-sm text-gray-500">© 2024 Your Company</div>
              </SidebarFooter>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main content area */}
        <SidebarInset>
          <div className="p-4 flex items-center border-b">
            <SidebarTrigger />
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <div className="p-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
