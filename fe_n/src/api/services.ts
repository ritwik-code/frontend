import apiClient from './client';
import { Indicator, IndicatorCategory } from '../types';

export const indicatorsApi = {
  // Get all indicator categories
  getCategories: async (): Promise<IndicatorCategory[]> => {
    const response = await apiClient.get('/indicators/categories/');
    return response.data.results;
  },

  // Get all indicators
  getIndicators: async (category?: string): Promise<Indicator[]> => {
    const params = category ? { category } : {};
    const response = await apiClient.get('/indicators/', { params });
    return response.data.results;
  },

  // Get single indicator
  getIndicator: async (id: number): Promise<Indicator> => {
    const response = await apiClient.get(`/indicators/${id}/`);
    return response.data;
  },
};

export const tradingApi = {
  // Get trading scenarios
  getScenarios: async () => {
    const response = await apiClient.get('/trading/scenarios/');
    return response.data.results;
  },

  // Get user portfolio
  getPortfolio: async (scenarioId: number) => {
    const response = await apiClient.get(`/trading/portfolio/?scenario=${scenarioId}`);
    return response.data;
  },

  // Place trade order
  placeOrder: async (orderData: {
    symbol: string;
    trade_type: 'buy' | 'sell';
    quantity: number;
    price: string;
  }) => {
    const response = await apiClient.post('/trading/orders/', orderData);
    return response.data;
  },

  // Get trading history
  getTradeHistory: async (portfolioId: number) => {
    const response = await apiClient.get(`/trading/history/?portfolio=${portfolioId}`);
    return response.data.results;
  },
};

export const strategiesApi = {
  // Get user strategies
  getStrategies: async () => {
    const response = await apiClient.get('/strategies/');
    return response.data.results;
  },

  // Create new strategy
  createStrategy: async (strategyData: {
    name: string;
    description: string;
    components: Record<string, any>;
  }) => {
    const response = await apiClient.post('/strategies/', strategyData);
    return response.data;
  },

  // Run backtest
  runBacktest: async (strategyId: number, params: {
    start_date: string;
    end_date: string;
    initial_capital: number;
  }) => {
    const response = await apiClient.post(`/strategies/${strategyId}/backtest/`, params);
    return response.data;
  },

  // Get ML components
  getMLComponents: async () => {
    const response = await apiClient.get('/strategies/ml-components/');
    return response.data.results;
  },
};

export const authApi = {
  // Login
  login: async (credentials: { username: string; password: string }) => {
    const response = await apiClient.post('/auth/login/', credentials);
    return response.data;
  },

  // Register
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    const response = await apiClient.post('/auth/register/', userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/user/');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout/');
    return response.data;
  },
};
