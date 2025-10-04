import { SidebarDemo } from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({ children }: { children: React.ReactNode}) {

    return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" richColors/>
        <div
            className={cn(
                "mx-auto flex w-full flex-1 flex-col overflow-hidden md:flex-row bg-background",
                "h-screen"
            )}
        >
            <SidebarDemo />
            {children}
        </div>
      </body>
    </html>
  );
}