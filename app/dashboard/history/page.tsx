"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getTradeHistory } from "@/lib/trade";
import { Trade } from "@/types/stock";
import { motion } from "framer-motion";
import { History, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";
import { formatPrice, formatPercentage } from "@/lib/formatPrice";
import { toast } from "sonner";

export default function TradeHistoryPage() {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");

  useEffect(() => {
    if (user) {
      fetchTradeHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchTradeHistory = async () => {
    try {
      setLoading(true);
      const data = await getTradeHistory(user!.id);
      setTrades(data);
    } catch (error) {
      toast.error("Failed to load trade history");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrades = trades.filter((trade) => {
    if (filter === "all") return true;
    return trade.type === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold tracking-[8px]">HISTORY</h1>
        <p className="text-neutral-500 mt-2">Your trading activity</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["all", "buy", "sell"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as typeof filter)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === tab
                ? "bg-white text-black"
                : "bg-neutral-900 text-neutral-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Trades List */}
      {filteredTrades.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-12 text-center"
        >
          <History className="mx-auto text-neutral-600 mb-4" size={48} />
          <h3 className="text-white font-semibold text-lg mb-2">
            No trades yet
          </h3>
          <p className="text-neutral-500">
            Start trading to build your history
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filteredTrades.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-neutral-950/65 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {/* Icon */}
                  <div
                    className={`p-2 rounded-lg ${
                      trade.type === "buy"
                        ? "bg-positive/10"
                        : "bg-negative/10"
                    }`}
                  >
                    {trade.type === "buy" ? (
                      <TrendingUp
                        className="text-positive"
                        size={20}
                      />
                    ) : (
                      <TrendingDown
                        className="text-negative"
                        size={20}
                      />
                    )}
                  </div>

                  {/* Trade Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">
                        {trade.symbol}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded uppercase ${
                          trade.type === "buy"
                            ? "bg-positive/20 text-positive"
                            : "bg-negative/20 text-negative"
                        }`}
                      >
                        {trade.type}
                      </span>
                    </div>
                    <p className="text-neutral-500 text-sm mb-2">
                      {trade.company_name}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />
                        {formatPrice(trade.price)} × {trade.quantity}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(trade.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Value */}
                <div className="text-right">
                  <p className="text-white font-semibold text-lg">
                    ${formatPrice(trade.total_value)}
                  </p>
                  <p className="text-neutral-500 text-sm">
                    {trade.market}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary */}
      {filteredTrades.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6"
        >
          <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-4">
            Summary
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-neutral-500 text-xs mb-1">Total Trades</p>
              <p className="text-white text-xl font-semibold">
                {filteredTrades.length}
              </p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs mb-1">Buy Orders</p>
              <p className="text-positive text-xl font-semibold">
                {filteredTrades.filter((t) => t.type === "buy").length}
              </p>
            </div>
            <div>
              <p className="text-neutral-500 text-xs mb-1">Sell Orders</p>
              <p className="text-negative text-xl font-semibold">
                {filteredTrades.filter((t) => t.type === "sell").length}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
