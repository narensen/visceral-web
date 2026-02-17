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
