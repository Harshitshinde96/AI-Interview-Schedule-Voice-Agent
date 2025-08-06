"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarOptions } from "@/services/Constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[150px] cursor-pointer"
          onClick={() => router.push("/dashboard")}
        />

        <Button
          className="w-full mt-5"
          onClick={() => router.push("/dashboard/create-interview")}
        >
          {" "}
          <Plus /> Create New Interview{" "}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {/*  This loads all clickable links one sidebar form
              service/Constants.jsx file */}
              {SidebarOptions.map((option, index) => (
                <SidebarMenuItem
                  key={index}
                  className={`p-1 rounded-md ${
                    path === option.path ? "bg-[#6C63FF]/10" : ""
                  }`}
                >
                  <SidebarMenuButton asChild className="p-5">
                    <Link href={option.path}>
                      <option.icon
                        className={`text-[22px] ${
                          path === option.path
                            ? "text-[#6C63FF]"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-[16px] ml-2 font-medium ${
                          path === option.path
                            ? "text-[#6C63FF] font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {/* change this text-[#6C63FF] color to this #64748b if does not suit */}

                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
