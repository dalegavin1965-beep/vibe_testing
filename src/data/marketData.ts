import { MarketItem, WorldIndexItem, StockItem, CryptoItem, CommodityItem, YieldItem, Timeframe, ChartPoint } from '../types';

export const SP500_1D: ChartPoint[] = [
  { time: '09:30', price: 5941.28 },
  { time: '10:00', price: 5945.80 },
  { time: '10:30', price: 5948.15 },
  { time: '11:00', price: 5938.40 },
  { time: '11:30', price: 5947.60 },
  { time: '12:00', price: 5953.20 },
  { time: '12:30', price: 5955.80 },
  { time: '13:00', price: 5954.10 },
  { time: '13:30', price: 5957.90 },
  { time: '14:00', price: 5961.40 },
  { time: '14:30', price: 5963.80 },
  { time: '15:00', price: 5962.10 },
  { time: '15:30', price: 5961.05 },
  { time: '15:45', price: 5963.50 },
  { time: '16:00', price: 5964.12 },
];

export const SP500_5D: ChartPoint[] = [
  { time: 'Nov 24', price: 5915.20 },
  { time: 'Nov 25', price: 5928.40 },
  { time: 'Nov 26', price: 5940.10 },
  { time: 'Nov 27', price: 5951.00 },
  { time: 'Nov 28', price: 5964.12 },
];

export const SP500_1M: ChartPoint[] = [
  { time: 'Nov 01', price: 5728.80 },
  { time: 'Nov 07', price: 5810.40 },
  { time: 'Nov 14', price: 5865.10 },
  { time: 'Nov 21', price: 5910.30 },
  { time: 'Nov 28', price: 5964.12 },
];

export const SP500_1Y: ChartPoint[] = [
  { time: 'Dec 23', price: 4719.19 },
  { time: 'Feb 24', price: 5096.27 },
  { time: 'Apr 24', price: 5035.69 },
  { time: 'Jun 24', price: 5460.48 },
  { time: 'Aug 24', price: 5648.40 },
  { time: 'Oct 24', price: 5864.67 },
  { time: 'Nov 24', price: 5964.12 },
];

export const SP500_5Y: ChartPoint[] = [
  { time: '2020', price: 3230.78 },
  { time: '2021', price: 3756.07 },
  { time: '2022', price: 4766.18 },
  { time: '2023', price: 3839.50 },
  { time: '2024', price: 5964.12 },
];

export const SP500_ALL: ChartPoint[] = [
  { time: '1990', price: 330.22 },
  { time: '2000', price: 1469.25 },
  { time: '2008', price: 1400.38 },
  { time: '2015', price: 2058.90 },
  { time: '2020', price: 3230.78 },
  { time: '2024', price: 5964.12 },
];

export const NASDAQ_1D: ChartPoint[] = [
  { time: '09:30', price: 20980.10 },
  { time: '10:30', price: 21010.50 },
  { time: '11:30', price: 21035.80 },
  { time: '12:30', price: 21020.40 },
  { time: '13:30', price: 21060.90 },
  { time: '14:30', price: 21095.30 },
  { time: '15:30', price: 21105.70 },
  { time: '16:00', price: 21118.24 },
];

export const DOW_1D: ChartPoint[] = [
  { time: '09:30', price: 44365.10 },
  { time: '10:30', price: 44340.20 },
  { time: '11:30', price: 44310.80 },
  { time: '12:30', price: 44290.40 },
  { time: '13:30', price: 44320.10 },
  { time: '14:30', price: 44275.50 },
  { time: '15:30', price: 44260.00 },
  { time: '16:00', price: 44296.51 },
];

export const TOP_INDICES: MarketItem[] = [
  {
    id: 'spx',
    name: 'S&P 500',
    symbol: 'INDEX:SPX',
    exchange: 'Cboe BZX',
    price: 5964.12,
    change: 22.84,
    changePercent: 0.38,
    isPositive: true,
    type: 'INDEX',
    badge: {
      text: '500',
      bgColor: '#f23645',
    },
    category: 'Indices',
    sparkline: [32, 28, 30, 18, 22, 8],
    timeframeData: {
      '1D': SP500_1D,
      '5D': SP500_5D,
      '1M': SP500_1M,
      '1Y': SP500_1Y,
      '5Y': SP500_5Y,
      'ALL': SP500_ALL,
    },
  },
  {
    id: 'ndx',
    name: 'Nasdaq 100',
    symbol: 'INDEX:NDX',
    exchange: 'NASDAQ',
    price: 21118.24,
    change: 134.20,
    changePercent: 0.64,
    isPositive: true,
    type: 'INDEX',
    badge: {
      text: '100',
      bgColor: '#0094ff',
    },
    category: 'Indices',
    sparkline: [35, 30, 25, 28, 10, 5],
    timeframeData: {
      '1D': NASDAQ_1D,
      '5D': [
        { time: 'Nov 24', price: 20920.00 },
        { time: 'Nov 25', price: 20980.50 },
        { time: 'Nov 26', price: 21040.20 },
        { time: 'Nov 27', price: 21085.10 },
        { time: 'Nov 28', price: 21118.24 },
      ],
      '1M': [
        { time: 'Nov 01', price: 19980.00 },
        { time: 'Nov 14', price: 20450.00 },
        { time: 'Nov 28', price: 21118.24 },
      ],
      '1Y': [
        { time: 'Dec 23', price: 16825.93 },
        { time: 'Jun 24', price: 19700.00 },
        { time: 'Nov 24', price: 21118.24 },
      ],
      '5Y': [
        { time: '2020', price: 8733.07 },
        { time: '2022', price: 16500.00 },
        { time: '2024', price: 21118.24 },
      ],
      'ALL': [
        { time: '1995', price: 500.00 },
        { time: '2000', price: 3700.00 },
        { time: '2010', price: 2200.00 },
        { time: '2024', price: 21118.24 },
      ],
    },
  },
  {
    id: 'dji',
    name: 'Dow 30',
    symbol: 'INDEX:DJI',
    exchange: 'NYSE',
    price: 44296.51,
    change: -68.20,
    changePercent: -0.15,
    isPositive: false,
    type: 'INDEX',
    badge: {
      text: '30',
      bgColor: '#00a3e0',
    },
    category: 'Indices',
    sparkline: [10, 12, 18, 22, 35, 32],
    timeframeData: {
      '1D': DOW_1D,
      '5D': [
        { time: 'Nov 24', price: 44450.00 },
        { time: 'Nov 25', price: 44400.20 },
        { time: 'Nov 26', price: 44350.50 },
        { time: 'Nov 27', price: 44310.10 },
        { time: 'Nov 28', price: 44296.51 },
      ],
      '1M': [
        { time: 'Nov 01', price: 42050.00 },
        { time: 'Nov 14', price: 43750.00 },
        { time: 'Nov 28', price: 44296.51 },
      ],
      '1Y': [
        { time: 'Dec 23', price: 37404.35 },
        { time: 'Jun 24', price: 39112.16 },
        { time: 'Nov 24', price: 44296.51 },
      ],
      '5Y': [
        { time: '2020', price: 28538.44 },
        { time: '2022', price: 36338.30 },
        { time: '2024', price: 44296.51 },
      ],
      'ALL': [
        { time: '1990', price: 2753.20 },
        { time: '2000', price: 11400.00 },
        { time: '2010', price: 10400.00 },
        { time: '2024', price: 44296.51 },
      ],
    },
  },
];

export const WORLD_INDICES: WorldIndexItem[] = [
  {
    countryCode: 'JP',
    name: 'Nikkei 225',
    symbol: 'NI225',
    city: 'Tokyo',
    price: 38349.06,
    changePercent: 0.84,
    isPositive: true,
  },
  {
    countryCode: 'DE',
    name: 'DAX Index',
    symbol: 'DAX',
    city: 'Frankfurt',
    price: 19425.73,
    changePercent: 0.48,
    isPositive: true,
  },
  {
    countryCode: 'UK',
    name: 'FTSE 100',
    symbol: 'UKX',
    city: 'London',
    price: 8281.22,
    changePercent: -0.12,
    isPositive: false,
  },
  {
    countryCode: 'HK',
    name: 'Hang Seng',
    symbol: 'HSI',
    city: 'Hong Kong',
    price: 19603.11,
    changePercent: 1.25,
    isPositive: true,
  },
  {
    countryCode: 'IN',
    name: 'Nifty 50',
    symbol: 'NIFTY',
    city: 'NSE India',
    price: 24131.10,
    changePercent: -0.32,
    isPositive: false,
  },
];

export const EXTENDED_WORLD_INDICES: WorldIndexItem[] = [
  ...WORLD_INDICES,
  {
    countryCode: 'FR',
    name: 'CAC 40',
    symbol: 'PX1',
    city: 'Paris',
    price: 7198.45,
    changePercent: 0.51,
    isPositive: true,
  },
  {
    countryCode: 'AU',
    name: 'ASX 200',
    symbol: 'XJO',
    city: 'Sydney',
    price: 8436.20,
    changePercent: 0.35,
    isPositive: true,
  },
  {
    countryCode: 'CN',
    name: 'Shanghai Composite',
    symbol: 'SHCOMP',
    city: 'Shanghai',
    price: 3326.46,
    changePercent: 0.93,
    isPositive: true,
  },
  {
    countryCode: 'CA',
    name: 'TSX Composite',
    symbol: 'OSPTX',
    city: 'Toronto',
    price: 25482.11,
    changePercent: -0.18,
    isPositive: false,
  },
  {
    countryCode: 'EU',
    name: 'Euro Stoxx 50',
    symbol: 'SX5E',
    city: 'Europe',
    price: 4802.14,
    changePercent: 0.42,
    isPositive: true,
  },
];

export const MOST_ACTIVE_STOCKS: StockItem[] = [
  {
    symbol: 'NASDAQ:NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    sector: 'Semiconductors',
    price: 138.25,
    changePercent: 4.12,
    isPositive: true,
    avatar: {
      text: 'NV',
      bgColor: '#059669', // emerald-600
    },
  },
  {
    symbol: 'NASDAQ:TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    sector: 'EV & Tech',
    price: 345.16,
    changePercent: 3.20,
    isPositive: true,
    avatar: {
      text: 'T',
      bgColor: '#dc2626', // red-600
    },
  },
  {
    symbol: 'NASDAQ:AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    sector: 'Consumer Electronics',
    price: 228.40,
    changePercent: 1.05,
    isPositive: true,
    avatar: {
      text: '',
      bgColor: '#27272a', // zinc-800
    },
  },
  {
    symbol: 'NASDAQ:MSFT',
    name: 'Microsoft Corp',
    exchange: 'NASDAQ',
    sector: 'Software',
    price: 422.80,
    changePercent: 0.65,
    isPositive: true,
    avatar: {
      text: 'MS',
      bgColor: '#2563eb', // blue-600
    },
  },
  {
    symbol: 'NASDAQ:GOOGL',
    name: 'Alphabet Inc.',
    exchange: 'NASDAQ',
    sector: 'Internet Services',
    price: 178.10,
    changePercent: -0.45,
    isPositive: false,
    avatar: {
      text: 'G',
      bgColor: '#f59e0b', // amber-500
    },
  },
];

export const EXTENDED_STOCKS: StockItem[] = [
  ...MOST_ACTIVE_STOCKS,
  {
    symbol: 'NASDAQ:AMZN',
    name: 'Amazon.com, Inc.',
    exchange: 'NASDAQ',
    sector: 'E-commerce & Cloud',
    price: 201.25,
    changePercent: 1.45,
    isPositive: true,
    avatar: {
      text: 'A',
      bgColor: '#ea580c',
    },
  },
  {
    symbol: 'NASDAQ:META',
    name: 'Meta Platforms, Inc.',
    exchange: 'NASDAQ',
    sector: 'Social Media & VR',
    price: 569.20,
    changePercent: 2.15,
    isPositive: true,
    avatar: {
      text: 'M',
      bgColor: '#0284c7',
    },
  },
  {
    symbol: 'NASDAQ:AMD',
    name: 'Advanced Micro Devices',
    exchange: 'NASDAQ',
    sector: 'Semiconductors',
    price: 142.30,
    changePercent: -1.12,
    isPositive: false,
    avatar: {
      text: 'AMD',
      bgColor: '#475569',
    },
  },
  {
    symbol: 'NYSE:PLTR',
    name: 'Palantir Technologies',
    exchange: 'NYSE',
    sector: 'Enterprise AI & Data',
    price: 64.80,
    changePercent: 5.80,
    isPositive: true,
    avatar: {
      text: 'PL',
      bgColor: '#0f172a',
    },
  },
];

export const CRYPTO_ASSETS: CryptoItem[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$96,450.00',
    changePercent: '+2.10%',
    isPositive: true,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,780.45',
    changePercent: '+1.80%',
    isPositive: true,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '$212.80',
    changePercent: '+5.40%',
    isPositive: true,
  },
];

export const COMMODITIES: CommodityItem[] = [
  {
    symbol: 'GC1!',
    name: 'Gold',
    price: '$2,642.50',
    changePercent: '+0.75%',
    isPositive: true,
  },
  {
    symbol: 'CL1!',
    name: 'Crude Oil',
    price: '$68.85',
    changePercent: '-1.20%',
    isPositive: false,
  },
  {
    symbol: 'SI1!',
    name: 'Silver',
    price: '$30.68',
    changePercent: '+1.15%',
    isPositive: true,
  },
];

export const TREASURY_YIELDS: YieldItem[] = [
  {
    symbol: 'US10Y',
    name: 'US 10Y',
    yield: '4.24%',
    change: '-0.038',
    isPositive: false,
  },
  {
    symbol: 'US02Y',
    name: 'US 2Y',
    yield: '4.21%',
    change: '-0.024',
    isPositive: false,
  },
  {
    symbol: 'DE10Y',
    name: 'Euro Bund',
    yield: '2.18%',
    change: '+0.012',
    isPositive: true,
  },
];
