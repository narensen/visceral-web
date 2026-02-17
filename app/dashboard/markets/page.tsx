"use client";
import { useState, useEffect } from "react";
import { fetchMarkets, searchStocks } from "@/lib/api";
import { MarketStock } from "@/types/stock";
import { supabase } from "@/lib/supabase";
import StockRow from "@/components/StockRow";
import MarketTabs from "@/components/MarketTabs";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { toast } from "sonner";

export default function MarketsPage() {
  const [activeMarket, setActiveMarket] = useState("US");
  const [stocks, setStocks] = useState<MarketStock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MarketStock[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadMarketStocks();
  }, [activeMarket]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Subscribe to realtime price updates
  useEffect(() => {
    const channel = supabase
      .channel('market_prices')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: process.env.NEXT_PUBLIC_MARKETS_REALTIME_TABLE || 'market_prices',
        },
        (payload: any) => {
          // Update stock prices in real-time
          if (payload.new && payload.new.symbol) {
            setStocks((prevStocks) =>
              prevStocks.map((stock) =>
                stock.symbol === payload.new.symbol
                  ? { ...stock, ...payload.new }
                  : stock
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadMarketStocks = async () => {
    try {
      setLoading(true);
      const data = await fetchMarkets(activeMarket);
      setStocks(data);
    } catch (error: any) {
      toast.error("Failed to load market data");
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      const results = await searchStocks(searchQuery);
      setSearchResults(results);
    } catch (error: any) {
      toast.error("Search failed");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const displayStocks = searchQuery.trim() ? searchResults : stocks;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-3xl font-bold tracking-[8px]">MARKETS</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stocks..."
          className="w-full pl-12 pr-12 py-3 bg-neutral-950/65 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Market Tabs */}
      {!searchQuery && (
        <MarketTabs
          activeMarket={activeMarket}
          onMarketChange={setActiveMarket}
        />
      )}

      {/* Stocks List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {loading || searching ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : displayStocks.length > 0 ? (
          <div>
            {displayStocks.map((stock) => (
              <StockRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-8 text-center">
            <p className="text-neutral-500">
              {searchQuery ? "No stocks found" : "No market data available"}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
