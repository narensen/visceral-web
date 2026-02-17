"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { fetchStockDetails } from "@/lib/api";
import { formatPrice, formatPercentage } from "@/lib/formatPrice";
import { motion } from "framer-motion";
import { ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";
import TradeModal from "@/components/TradeModal";
import RangeSwitcher from "@/components/RangeSwitcher";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "@/lib/watchlist";

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
  market: string;
}

export default function StockDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const ticker = params.ticker as string;
  const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("1M");
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    if (ticker) {
      loadStockDetails();
      checkWatchlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker, timeRange]);

  const loadStockDetails = async () => {
    try {
      setLoading(true);
      // Convert display range to API range
      const apiRange = timeRange === "1D" ? "1d" : 
                       timeRange === "1W" ? "1w" : 
                       timeRange === "1M" ? "1mo" : 
                       timeRange === "3M" ? "3mo" :
                       timeRange === "6M" ? "6mo" : "1y";
      const data = await fetchStockDetails(ticker, apiRange);
      setStockDetails(data);
    } catch {
      toast.error("Failed to load stock details");
    } finally {
      setLoading(false);
    }
  };

  const checkWatchlist = async () => {
    if (user) {
      try {
        const result = await isInWatchlist(user.id, ticker);
        setInWatchlist(result);
      } catch (error) {
        console.error("Failed to check watchlist:", error);
      }
    }
  };

  const handleWatchlistToggle = async () => {
    if (!user) return;
    
    try {
      if (inWatchlist) {
        await removeFromWatchlist(user.id, ticker);
        setInWatchlist(false);
        toast.success("Removed from watchlist");
      } else {
        await addToWatchlist(user.id, ticker, stockDetails?.market || "US"); // Use actual market or default to US
        setInWatchlist(true);
        toast.success("Added to watchlist");
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Failed to update watchlist");
    }
  };

  const handleBuy = () => {
    setTradeType("buy");
    setIsTradeModalOpen(true);
  };

  const handleSell = () => {
    setTradeType("sell");
    setIsTradeModalOpen(true);
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
          <button
            onClick={handleWatchlistToggle}
            className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <Star
              size={24}
              className={inWatchlist ? "fill-yellow-500 text-yellow-500" : "text-neutral-400"}
            />
          </button>
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
        <RangeSwitcher
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />
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
        <button
          onClick={handleBuy}
          className="py-4 bg-positive text-black font-semibold rounded-xl hover:bg-positive/90 transition-colors"
        >
          Buy
        </button>
        <button
          onClick={handleSell}
          className="py-4 bg-negative text-black font-semibold rounded-xl hover:bg-negative/90 transition-colors"
        >
          Sell
        </button>
      </motion.div>

      {/* Trade Modal */}
      {user && (
        <TradeModal
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          symbol={stockDetails.symbol}
          companyName={stockDetails.company_name}
          currentPrice={stockDetails.current_price}
          market={stockDetails.market || "US"}
          userId={user.id}
          type={tradeType}
        />
      )}
    </div>
  );
}
