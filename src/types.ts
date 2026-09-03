export type Timeframe = '1D' | '5D' | '1M' | '1Y' | '5Y' | 'ALL';

export type MarketCategory = 
  | 'Indices' 
  | 'US stocks' 
  | 'World stocks' 
  | 'Crypto' 
  | 'Futures' 
  | 'Forex' 
  | 'Bonds' 
  | 'ETFs' 
  | 'Economy';

export interface ChartPoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

export interface MarketItem {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  price: number;
  priceFormatted?: string;
  change: number;
  changePercent: number;
  isPositive: boolean;
  type?: 'INDEX' | 'STOCK' | 'CRYPTO' | 'COMMODITY' | 'BOND' | 'FOREX';
  badge?: {
    text: string;
    bgColor: string;
    textColor?: string;
  };
  subtitle?: string;
  category: MarketCategory;
  sparkline: number[];
  timeframeData?: Record<Timeframe, ChartPoint[]>;
}

export interface WorldIndexItem {
  countryCode: string;
  name: string;
  symbol: string;
  city: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
}

export interface StockItem {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
  avatar: {
    text: string;
    bgColor: string;
    textColor?: string;
  };
}

export interface CryptoItem {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
  isPositive: boolean;
}

export interface CommodityItem {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
  isPositive: boolean;
}

export interface YieldItem {
  symbol: string;
  name: string;
  yield: string;
  change: string;
  isPositive: boolean;
}
