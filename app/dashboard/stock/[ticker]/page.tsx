"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchStockDetails } from "@/lib/api";
import { formatPrice, formatPercentage } from "@/lib/formatPrice";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface StockDetails {
  symbol: string;
  company_name: string;
  current_price: number;
  percentage_change: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  market_cap?: string;
}

export default function StockDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const ticker = params.ticker as string;
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("1mo");

  useEffect(() => {
    if (ticker) {
      loadStockDetails();
    }
  }, [ticker, timeRange]);

  const loadStockDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchStockDetails(ticker, timeRange);
      setStockDetails(data);
    } catch (error: any) {
      toast.error("Failed to load stock details");
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

  if (!stockDetails) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-8 text-center">
          <p className="text-neutral-500">Stock not found</p>
        </div>
      </div>
    );
  }

  const isPositive = stockDetails.percentage_change >= 0;
  const colorClass = isPositive ? "text-positive" : "text-negative";

  const timeRanges = [
    { id: "1d", label: "1D" },
    { id: "1w", label: "1W" },
    { id: "1mo", label: "1M" },
    { id: "3mo", label: "3M" },
    { id: "1y", label: "1Y" },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Stock Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{stockDetails.symbol}</h1>
            <p className="text-neutral-400 mt-1">{stockDetails.company_name}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-4xl font-bold text-white mb-2">
            ${formatPrice(stockDetails.current_price)}
          </p>
          <p className={`text-xl font-semibold ${colorClass}`}>
            {formatPercentage(stockDetails.percentage_change)}
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range.id
                  ? "bg-white text-black"
                  : "bg-neutral-950/50 text-neutral-400 hover:text-white"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stock Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-6"
      >
        <h3 className="text-neutral-400 text-sm uppercase tracking-wider mb-4">
          Statistics
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-neutral-500 text-sm mb-1">Open</p>
            <p className="text-white font-semibold text-lg">
              ${formatPrice(stockDetails.open)}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 text-sm mb-1">High</p>
            <p className="text-white font-semibold text-lg">
              ${formatPrice(stockDetails.high)}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 text-sm mb-1">Low</p>
            <p className="text-white font-semibold text-lg">
              ${formatPrice(stockDetails.low)}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 text-sm mb-1">Volume</p>
            <p className="text-white font-semibold text-lg">
              {stockDetails.volume.toLocaleString()}
            </p>
          </div>
          {stockDetails.market_cap && (
            <div className="col-span-2">
              <p className="text-neutral-500 text-sm mb-1">Market Cap</p>
              <p className="text-white font-semibold text-lg">
                {stockDetails.market_cap}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <button className="py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors">
          Buy
        </button>
        <button className="py-3 bg-neutral-950/65 border border-neutral-800 text-white font-semibold rounded-lg hover:border-neutral-700 transition-colors">
          Sell
        </button>
      </motion.div>
    </div>
  );
}
