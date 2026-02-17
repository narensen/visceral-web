"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import BottomNav from "@/components/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, authloading } = useAuth();

  useEffect(() => {
    if (!authloading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authloading, router]);

  if (authloading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pb-20">
      <main className="max-w-screen-xl mx-auto px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  );
}
