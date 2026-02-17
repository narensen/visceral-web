"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { LogOut, User, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold tracking-[8px]">PROFILE</h1>
      </div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center">
            <User className="text-neutral-400" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {user?.user_metadata?.full_name || "User"}
            </h2>
            <p className="text-neutral-400 flex items-center gap-2">
              <Mail size={16} />
              {user?.email}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-1">Account Type</h3>
          <p className="text-neutral-400 text-sm">Paper Trading Account</p>
        </div>

        <div className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-1">User ID</h3>
          <p className="text-neutral-400 text-sm font-mono">{user?.id}</p>
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        disabled={loading}
        className="w-full bg-red-950/30 border border-red-800/50 text-red-400 font-semibold rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-red-950/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut size={20} />
        {loading ? "Logging out..." : "Logout"}
      </motion.button>

      {/* Info Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-4 flex gap-3"
      >
        <AlertCircle className="text-neutral-400 flex-shrink-0" size={20} />
        <div>
          <p className="text-neutral-400 text-sm">
            This is a paper trading account. All trades are simulated and no real money is involved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
