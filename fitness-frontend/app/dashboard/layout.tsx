import { SidebarDemo } from "@/components/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "../globals.css";
import GridBackground from "@/components/GridBackground";
import { AuthProvider } from "@/hooks/AuthContext";

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
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Toaster position="top-right" richColors />
          <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-white">
            {/* Grid Background */}
            <GridBackground />

            {/* Foreground content */}
            <div className="relative z-10 flex min-h-screen">
              <SidebarDemo />
              <main className="flex-1 p-8 overflow-y-auto">
                  {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </div>
  );
}