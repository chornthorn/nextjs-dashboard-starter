import type { Metadata } from "next";
import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Dashboard Starter",
  description: "Dashboard Starter",
};

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-col w-full">
            <Navbar />
            <main className="flex flex-1 flex-col gap-4 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
