"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { buyStock, sellStock } from "@/lib/trade";
import { formatPrice } from "@/lib/formatPrice";
import { toast } from "sonner";

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  companyName: string;
  currentPrice: number;
  market: string;
  userId: string;
  type: "buy" | "sell";
  availableShares?: number;
}

export default function TradeModal({
  isOpen,
  onClose,
  symbol,
  companyName,
  currentPrice,
  market,
  userId,
  type,
  availableShares = 0,
}: TradeModalProps) {
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(false);

  const quantityNum = parseInt(quantity) || 0;
  const totalValue = quantityNum * currentPrice;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (quantityNum <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    if (type === "sell" && quantityNum > availableShares) {
      toast.error(`You only have ${availableShares} shares to sell`);
      return;
    }

    setLoading(true);

    try {
      if (type === "buy") {
        await buyStock(userId, symbol, quantityNum, currentPrice, market);
        toast.success(`Successfully bought ${quantityNum} shares of ${symbol}`);
      } else {
        await sellStock(userId, symbol, quantityNum, currentPrice, market);
        toast.success(`Successfully sold ${quantityNum} shares of ${symbol}`);
      }
      onClose();
      setQuantity("1");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || `Failed to ${type} stock`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="bg-neutral-950 border border-neutral-800 rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      type === "buy" ? "bg-positive/10" : "bg-negative/10"
                    }`}
                  >
                    {type === "buy" ? (
                      <TrendingUp className="text-positive" size={24} />
                    ) : (
                      <TrendingDown className="text-negative" size={24} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold capitalize">
                      {type} {symbol}
                    </h2>
                    <p className="text-neutral-400 text-sm">{companyName}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Current Price */}
                <div>
                  <label className="text-neutral-500 text-sm mb-2 block">
                    Current Price
                  </label>
                  <div className="text-white text-2xl font-bold">
                    ${formatPrice(currentPrice)}
                  </div>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="text-neutral-500 text-sm mb-2 block">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    max={type === "sell" ? availableShares : undefined}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-neutral-700"
                    placeholder="Enter quantity"
                    required
                  />
                  {type === "sell" && (
                    <p className="text-neutral-500 text-xs mt-1">
                      Available: {availableShares} shares
                    </p>
                  )}
                </div>

                {/* Total Value */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-500 text-sm">Total Value</span>
                    <span className="text-white text-2xl font-bold">
                      ${formatPrice(totalValue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">
                      {quantityNum} × ${formatPrice(currentPrice)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || quantityNum <= 0}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                    type === "buy"
                      ? "bg-positive text-black hover:bg-positive/90"
                      : "bg-negative text-black hover:bg-negative/90"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading
                    ? "Processing..."
                    : `${type === "buy" ? "Buy" : "Sell"} ${quantityNum} ${
                        quantityNum === 1 ? "Share" : "Shares"
                      }`}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
