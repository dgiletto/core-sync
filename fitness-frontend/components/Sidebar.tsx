"use client"
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
    LogOut,
    Dumbbell,
    Brain,
    ChartNoAxesCombined,
    User
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  }

  const links = [
    {
        label: "Workout",
        href: "/dashboard/workout",
        icon : (
            <Dumbbell className="h-5 w-5 shrink-0 text-neutral-200" />
        )
    },
    {
        label: "Recommendations",
        href: "/dashboard/recommendations",
        icon : (
            <Brain className="h-5 w-5 shrink-0 text-neutral-200" />
        )
    },
    {
        label: "Progress Report",
        href: "/dashboard/progress",
        icon : (
            <ChartNoAxesCombined className="h-5 w-5 shrink-0 text-neutral-200" />
        )
    },
  ]

  return (
    <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                />
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-neutral-200 justify-start group/sidebar p-2 cursor-pointer rounded-md hover:bg-neutral-700"
              >
                <LogOut className="h-5 w-5 shrink-0 text-neutral-200"/>
                <motion.span
                    animate={{
                        display: open ? "inline-block" : "none",
                        opacity: open ? 1 : 0,
                    }}
                    className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                >
                    Logout
                </motion.span>
              </button>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Profile",
                href: "/dashboard/profile",
                icon: (
                  <User className="h-5 w-5 shrink-0 text-neutral-200"/>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
  );
}

export const Logo = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
        <div className="flex items-center space-x-2 px-1">
            <span className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                C
            </span>
        </div>
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium whitespace-pre text-white"
        >
            CoreSync
        </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
        <div className="flex items-center space-x-2 px-1">
            <span className="w-7 h-7 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                C
            </span>
        </div>
    </a>
  );
};