"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Users, BookOpen, History } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/markets", label: "Markets", icon: TrendingUp },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/almanack", label: "Almanack", icon: BookOpen },
  { href: "/dashboard/social", label: "Social", icon: Users },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-950/95 border-t border-neutral-800 backdrop-blur-sm z-50">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <Icon
                  size={24}
                  className={isActive ? "text-white" : "text-neutral-500"}
                />
                <span
                  className={`text-xs mt-1 ${
                    isActive ? "text-white" : "text-neutral-500"
                  }`}
                >
                  {label}
                </span>
              </motion.div>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
