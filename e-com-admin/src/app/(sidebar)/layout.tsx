// app/(sidebar)/layout.tsx
"use client";
import SidebarLayout from "@/components/ui/sidebar/sidebar-layout";

export default function SidebarGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
