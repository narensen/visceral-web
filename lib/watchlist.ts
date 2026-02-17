/**
 * Watchlist API functions
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";

export interface WatchlistStock {
  id: string;
  symbol: string;
  company_name: string;
  market: string;
  added_at: string;
  current_price?: number;
  percentage_change?: number;
}

/**
 * Get user's watchlist
 */
export async function getWatchlist(userId: string): Promise<WatchlistStock[]> {
  const res = await fetch(`${BASE_URL}/watchlist?user_id=${userId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch watchlist");
  }

  return res.json();
}

/**
 * Add stock to watchlist
 */
export async function addToWatchlist(
  userId: string,
  symbol: string,
  market: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/watchlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      symbol,
      market,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add to watchlist");
  }

  return res.json();
}

/**
 * Remove stock from watchlist
 */
export async function removeFromWatchlist(
  userId: string,
  symbol: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/watchlist/${symbol}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to remove from watchlist");
  }

  return res.json();
}

/**
 * Check if a stock is in the watchlist
 */
export async function isInWatchlist(
  userId: string,
  symbol: string
): Promise<boolean> {
  const res = await fetch(
    `${BASE_URL}/watchlist/check?user_id=${userId}&symbol=${symbol}`
  );
  
  if (!res.ok) {
    return false;
  }

  const data = await res.json();
  return data.in_watchlist === true;
}
