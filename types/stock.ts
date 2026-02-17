export interface MarketStock {
  symbol: string;
  company_name?: string;
  name?: string;
  market: string;
  display_price: number;
  percentage_change: number;
}

export interface Holding {
  symbol: string;
  company_name: string;
  quantity: number;
  avg_price: number;
  current_price: number;
  total_value: number;
  total_return: number;
  percentage_return: number;
}

export interface HomeData {
  paper_balance: number;
  total_return: number;
  single_day_return: number;
  holdings: Holding[];
}

export interface StockDetail {
  symbol: string;
  company_name: string;
  market: string;
  current_price: number;
  percentage_change: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  market_cap?: number;
  pe_ratio?: number;
  history?: PricePoint[];
}

export interface PricePoint {
  timestamp: string;
  price: number;
}

export interface Trade {
  id: string;
  user_id: string;
  symbol: string;
  company_name: string;
  market: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  total_value: number;
  timestamp: string;
}

export interface League {
  id: string;
  name: string;
  description: string;
  members_count: number;
  start_date: string;
  end_date: string;
  is_member: boolean;
}

export interface LeagueMember {
  user_id: string;
  username: string;
  avatar?: string;
  rank: number;
  total_return: number;
  portfolio_value: number;
}
