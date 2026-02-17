"use client";
import { motion } from "framer-motion";
import { Users, UserPlus, TrendingUp, Award } from "lucide-react";

export default function SocialPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold tracking-[8px]">SOCIAL</h1>
        <p className="text-neutral-500 mt-2">Connect with other traders</p>
      </div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-12 text-center"
      >
        <Users className="mx-auto text-neutral-600 mb-6" size={64} />
        <h2 className="text-white text-2xl font-bold mb-4">
          Social Features Coming Soon
        </h2>
        <p className="text-neutral-400 max-w-md mx-auto mb-8">
          We&apos;re building an exciting social experience where you can connect with other traders,
          share insights, and learn from the community.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-neutral-950/50 border border-neutral-800 rounded-xl p-6">
            <UserPlus className="mx-auto text-positive mb-3" size={32} />
            <h3 className="text-white font-semibold mb-2">Follow Traders</h3>
            <p className="text-neutral-500 text-sm">
              Connect with successful traders and learn from their strategies
            </p>
          </div>
          
          <div className="bg-neutral-950/50 border border-neutral-800 rounded-xl p-6">
            <TrendingUp className="mx-auto text-positive mb-3" size={32} />
            <h3 className="text-white font-semibold mb-2">Share Insights</h3>
            <p className="text-neutral-500 text-sm">
              Post your trading ideas and get feedback from the community
            </p>
          </div>
          
          <div className="bg-neutral-950/50 border border-neutral-800 rounded-xl p-6">
            <Award className="mx-auto text-positive mb-3" size={32} />
            <h3 className="text-white font-semibold mb-2">Leaderboards</h3>
            <p className="text-neutral-500 text-sm">
              See how you rank against other traders in real-time
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stay Tuned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-6 text-center"
      >
        <p className="text-neutral-400">
          Stay tuned for updates! Social features will be launching soon.
        </p>
      </motion.div>
    </div>
  );
}
