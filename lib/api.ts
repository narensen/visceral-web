const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000";

export async function fetchMarkets(region: string) {
  const res = await fetch(`${BASE_URL}/markets?region=${region}`);
  if (!res.ok) throw new Error('Failed to fetch markets');
  return res.json();
}

export async function fetchStockDetails(ticker: string, range: string = "1mo") {
  const res = await fetch(`${BASE_URL}/single-stock/${ticker}?range=${range}`);
  if (!res.ok) throw new Error('Failed to fetch stock details');
  return res.json();
}

export async function searchStocks(q: string, signal?: AbortSignal) {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(q)}`, { signal });
  if (!res.ok) throw new Error('Failed to search stocks');
  const json = await res.json();
  return Array.isArray(json) ? json : [json];
}

export async function getHomeData(userId: string) {
  const res = await fetch(`${BASE_URL}/home?user_id=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch home data');
  return res.json();
}
