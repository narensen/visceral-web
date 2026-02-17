"use client";
import { motion } from "framer-motion";
import { Trophy, Users, TrendingUp } from "lucide-react";

export default function LeaguesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold tracking-[8px]">LEAGUES</h1>
      </div>

      {/* Coming Soon Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-12 text-center"
      >
        <Trophy className="mx-auto mb-4 text-neutral-400" size={64} />
        <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-neutral-400 mb-8">
          Compete with friends and traders worldwide in exciting leagues
        </p>
      </motion.div>

      {/* Features Preview */}
      <div className="grid gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <Users className="text-neutral-400 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-1">Create Leagues</h3>
              <p className="text-neutral-500 text-sm">
                Form private leagues with friends or join public competitions
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <TrendingUp className="text-neutral-400 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-1">Track Performance</h3>
              <p className="text-neutral-500 text-sm">
                See real-time rankings and compare your trading performance
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <Trophy className="text-neutral-400 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-1">Win Rewards</h3>
              <p className="text-neutral-500 text-sm">
                Compete for prizes and bragging rights
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
