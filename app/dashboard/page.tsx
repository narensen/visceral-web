"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getHomeData } from "@/lib/api";
import { HomeData } from "@/types/stock";
import { formatPrice, formatPercentage } from "@/lib/formatPrice";
import HoldingCard from "@/components/HoldingCard";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user } = useAuth();
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAlmanackOpen, setIsAlmanackOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchHomeData();
    }
  }, [user]);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const data = await getHomeData(user!.id);
      setHomeData(data);
    } catch (error: any) {
      toast.error("Failed to load home data");
      // Set default empty data to avoid crashes
      setHomeData({
        paper_balance: 0,
        total_return: 0,
        single_day_return: 0,
        holdings: [],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const balanceIsPositive = (homeData?.paper_balance || 0) >= 0;
  const totalReturnIsPositive = (homeData?.total_return || 0) >= 0;
  const singleDayIsPositive = (homeData?.single_day_return || 0) >= 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold tracking-[8px]">VISCERAL</h1>
      </div>

      {/* Paper Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6"
      >
        <p className="text-neutral-500 text-sm uppercase tracking-wider mb-2">
          Paper Balance
        </p>
        <h2 className="text-4xl font-bold text-white mb-4">
          ${formatPrice(homeData?.paper_balance || 0)}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Total Return
            </p>
            <p className={`text-xl font-semibold ${totalReturnIsPositive ? 'text-positive' : 'text-negative'}`}>
              {formatPercentage(homeData?.total_return || 0)}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Single Day
            </p>
            <p className={`text-xl font-semibold ${singleDayIsPositive ? 'text-positive' : 'text-negative'}`}>
              {formatPercentage(homeData?.single_day_return || 0)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Almanack Section */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsAlmanackOpen(true)}
        className="w-full bg-neutral-950/65 border border-neutral-800 rounded-2xl p-6 flex items-center justify-between hover:border-neutral-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="text-neutral-400" size={24} />
          <div className="text-left">
            <p className="text-white font-semibold">Almanack</p>
            <p className="text-neutral-500 text-sm">Trading insights & tips</p>
          </div>
        </div>
        <ChevronDown className="text-neutral-400" size={24} />
      </motion.button>

      {/* Holdings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-4">
          Your Holdings
        </h3>
        {homeData?.holdings && homeData.holdings.length > 0 ? (
          <div>
            {homeData.holdings.map((holding) => (
              <HoldingCard key={holding.symbol} holding={holding} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-neutral-500">No holdings yet</p>
            <p className="text-neutral-600 text-sm mt-2">
              Start trading to build your portfolio
            </p>
          </div>
        )}
      </motion.div>

      {/* Almanack Modal */}
      <Modal
        isOpen={isAlmanackOpen}
        onClose={() => setIsAlmanackOpen(false)}
        title="Almanack"
      >
        <div className="space-y-4 text-neutral-300">
          <p>Welcome to Visceral's Almanack - your guide to smarter trading.</p>
          <div className="space-y-3">
            <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Risk Management</h4>
              <p className="text-sm">Never invest more than you can afford to lose. Diversify your portfolio across different sectors.</p>
            </div>
            <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Research First</h4>
              <p className="text-sm">Always research companies before investing. Look at fundamentals, news, and market trends.</p>
            </div>
            <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-sm">Keep track of market news and your portfolio performance. Regular monitoring helps make informed decisions.</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
