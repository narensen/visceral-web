"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart2, Users, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardTab {
  name: string;
  path: string;
  icon: typeof Home;
  matchPrefixes?: string[];
}

const tabs: DashboardTab[] = [
  { name: "Home", path: "/dashboard", icon: Home },
  { 
    name: "Markets", 
    path: "/dashboard/markets", 
    icon: BarChart2,
    matchPrefixes: ["/dashboard/markets", "/dashboard/stock"]
  },
  { name: "Social", path: "/dashboard/social", icon: Users },
  { name: "Leagues", path: "/dashboard/leagues", icon: Trophy },
  { 
    name: "Profile", 
    path: "/dashboard/settings", 
    icon: User,
    matchPrefixes: ["/dashboard/settings", "/dashboard/history", "/dashboard/almanack"]
  },
];

// Constants for pill indicator positioning
const PILL_HORIZONTAL_MARGIN = 0.25; // rem
const PILL_HORIZONTAL_SPACING = 0.5; // rem

export default function BottomNav() {
  const pathname = usePathname();

  // Hide navbar on stock-details page
  if (pathname?.startsWith("/dashboard/stock/")) {
    return null;
  }

  // Determine which tab is active based on pathname
  const getActiveIndex = () => {
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      
      // Check exact match first
      if (pathname === tab.path) {
        return i;
      }
      
      // Check matchPrefixes
      if (tab.matchPrefixes) {
        for (const prefix of tab.matchPrefixes) {
          if (pathname?.startsWith(prefix)) {
            return i;
          }
        }
      }
    }
    return -1;
  };

  const activeIndex = getActiveIndex();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#050505] border-t border-[#101010] backdrop-blur-sm z-50">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center h-16 px-2 relative">
        {/* Animated indicator pill */}
        {activeIndex !== -1 && (
          <motion.div
            layoutId="activeTabPill"
            className="absolute h-10 bg-[#090909] border border-white/5 rounded-full"
            initial={false}
            animate={{
              left: `calc(${(activeIndex / tabs.length) * 100}% + ${PILL_HORIZONTAL_MARGIN}rem)`,
              width: `calc(${100 / tabs.length}% - ${PILL_HORIZONTAL_SPACING}rem)`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="flex flex-col items-center justify-center flex-1 h-full relative z-10"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                animate={{ scale: isActive ? 1.04 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-1"
              >
                <Icon
                  size={22}
                  className={isActive ? "text-white" : "text-[#777777]"}
                  strokeWidth={2}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-white" : "text-[#737373]"
                  }`}
                >
                  {tab.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
