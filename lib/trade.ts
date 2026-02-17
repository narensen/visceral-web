/**
 * Trade API functions - buy and sell stocks
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";

export interface TradeRequest {
  user_id: string;
  symbol: string;
  quantity: number;
  price: number;
  market: string;
}

export interface TradeResponse {
  success: boolean;
  message: string;
  new_balance?: number;
  transaction_id?: string;
}

/**
 * Buy a stock
 */
export async function buyStock(
  userId: string,
  symbol: string,
  quantity: number,
  price: number,
  market: string
): Promise<TradeResponse> {
  const res = await fetch(`${BASE_URL}/trade/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      symbol,
      quantity,
      price,
      market,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to buy stock");
  }

  return res.json();
}

/**
 * Sell a stock
 */
export async function sellStock(
  userId: string,
  symbol: string,
  quantity: number,
  price: number,
  market: string
): Promise<TradeResponse> {
  const res = await fetch(`${BASE_URL}/trade/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      symbol,
      quantity,
      price,
      market,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to sell stock");
  }

  return res.json();
}

/**
 * Get trade history for a user
 */
export async function getTradeHistory(userId: string) {
  const res = await fetch(`${BASE_URL}/trades?user_id=${userId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch trade history");
  }

  return res.json();
}

/**
 * Get specific trade details
 */
export async function getTradeDetails(tradeId: string) {
  const res = await fetch(`${BASE_URL}/trade/${tradeId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch trade details");
  }

  return res.json();
}
