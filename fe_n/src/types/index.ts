export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IndicatorCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
  description: string;
}

export interface Indicator {
  id: number;
  name: string;
  slug: string;
  category: IndicatorCategory;
  description: string;
  tutorial_url: string;
  formula: string;
  parameters: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TradingScenario {
  id: number;
  name: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  start_date: string;
  end_date: string;
  description: string;
  initial_capital: string;
  symbols: string[];
  is_active: boolean;
  created_at: string;
}

export interface Portfolio {
  id: number;
  user: number;
  scenario: TradingScenario;
  cash_balance: string;
  current_value: string;
  total_return: string;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: number;
  portfolio: number;
  symbol: string;
  trade_type: 'buy' | 'sell';
  quantity: number;
  price: string;
  total_amount: string;
  timestamp: string;
}

export interface Position {
  id: number;
  portfolio: number;
  symbol: string;
  quantity: number;
  average_cost: string;
  current_price: string;
  unrealized_pnl: string;
  updated_at: string;
}

export interface Strategy {
  id: number;
  user: number;
  name: string;
  description: string;
  components: Record<string, any>;
  backtest_results: Record<string, any> | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface MLComponent {
  id: number;
  name: string;
  slug: string;
  algorithm_type: string;
  parameters: Record<string, any>;
  description: string;
  is_active: boolean;
  created_at: string;
}

export interface MarketData {
  id: number;
  symbol: string;
  date: string;
  open_price: string;
  high_price: string;
  low_price: string;
  close_price: string;
  volume: number;
  adjusted_close: string;
}
