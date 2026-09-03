import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { TopTickers } from './components/TopTickers';
import { InteractiveChart } from './components/InteractiveChart';
import { WorldIndices } from './components/WorldIndices';
import { MostActiveStocks } from './components/MostActiveStocks';
import { MultiAssetCards } from './components/MultiAssetCards';
import { QuickSearchModal } from './components/QuickSearchModal';
import { FullChartModal } from './components/FullChartModal';
import { ScreenerModal } from './components/ScreenerModal';
import { WorldIndicesModal } from './components/WorldIndicesModal';
import { GetStartedModal } from './components/GetStartedModal';
import { Footer } from './components/Footer';

import {
  TOP_INDICES,
  WORLD_INDICES,
  MOST_ACTIVE_STOCKS,
  CRYPTO_ASSETS,
  COMMODITIES,
  TREASURY_YIELDS,
} from './data/marketData';
import { MarketItem, MarketCategory, Timeframe, WorldIndexItem, StockItem } from './types';

export default function App() {
  const [activeNav, setActiveNav] = useState<string>('Markets');
  const [region, setRegion] = useState<string>('everywhere');
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('Indices');
  const [selectedItem, setSelectedItem] = useState<MarketItem>(TOP_INDICES[0]);
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isFullChartOpen, setIsFullChartOpen] = useState<boolean>(false);
  const [isScreenerOpen, setIsScreenerOpen] = useState<boolean>(false);
  const [isWorldIndicesOpen, setIsWorldIndicesOpen] = useState<boolean>(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);

  // When a stock is selected from MostActiveStocks or Screener
  const handleSelectStock = (stock: StockItem) => {
    const stockAsMarketItem: MarketItem = {
      id: stock.symbol.toLowerCase(),
      name: stock.name,
      symbol: stock.symbol,
      exchange: stock.exchange,
      price: stock.price,
      change: (stock.price * stock.changePercent) / 100,
      changePercent: stock.changePercent,
      isPositive: stock.isPositive,
      type: 'STOCK',
      category: 'US stocks',
      badge: {
        text: stock.avatar.text,
        bgColor: stock.avatar.bgColor,
      },
      sparkline: [25, 27, 26, 31, 35],
      timeframeData: {
        '1D': [
          { time: '09:30', price: stock.price * 0.985 },
          { time: '11:00', price: stock.price * 0.99 },
          { time: '12:30', price: stock.price * 0.995 },
          { time: '14:00', price: stock.price * 1.01 },
          { time: '15:30', price: stock.price * 1.005 },
          { time: '16:00', price: stock.price },
        ],
        '5D': [
          { time: 'Nov 24', price: stock.price * 0.96 },
          { time: 'Nov 25', price: stock.price * 0.97 },
          { time: 'Nov 26', price: stock.price * 0.985 },
          { time: 'Nov 27', price: stock.price * 0.99 },
          { time: 'Nov 28', price: stock.price },
        ],
        '1M': [
          { time: 'Nov 01', price: stock.price * 0.91 },
          { time: 'Nov 14', price: stock.price * 0.95 },
          { time: 'Nov 28', price: stock.price },
        ],
        '1Y': [
          { time: 'Dec 23', price: stock.price * 0.65 },
          { time: 'Jun 24', price: stock.price * 0.85 },
          { time: 'Nov 24', price: stock.price },
        ],
        '5Y': [
          { time: '2020', price: stock.price * 0.25 },
          { time: '2022', price: stock.price * 0.5 },
          { time: '2024', price: stock.price },
        ],
        'ALL': [
          { time: '2015', price: stock.price * 0.1 },
          { time: '2020', price: stock.price * 0.25 },
          { time: '2024', price: stock.price },
        ],
      },
    };
    setSelectedItem(stockAsMarketItem);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  // When a world index is selected
  const handleSelectWorldIndex = (item: WorldIndexItem) => {
    const worldIndexAsMarketItem: MarketItem = {
      id: item.symbol.toLowerCase(),
      name: item.name,
      symbol: `${item.symbol} • ${item.city}`,
      exchange: item.city,
      price: item.price,
      change: (item.price * item.changePercent) / 100,
      changePercent: item.changePercent,
      isPositive: item.isPositive,
      type: 'INDEX',
      category: 'World stocks',
      badge: {
        text: item.countryCode,
        bgColor: '#334155',
      },
      sparkline: [20, 22, 21, 26, 28],
      timeframeData: {
        '1D': [
          { time: '09:30', price: item.price * 0.992 },
          { time: '11:00', price: item.price * 0.996 },
          { time: '12:30', price: item.price * 0.998 },
          { time: '14:00', price: item.price * 1.002 },
          { time: '15:30', price: item.price * 1.006 },
          { time: '16:00', price: item.price },
        ],
        '5D': [
          { time: 'Nov 24', price: item.price * 0.98 },
          { time: 'Nov 25', price: item.price * 0.985 },
          { time: 'Nov 26', price: item.price * 0.99 },
          { time: 'Nov 27', price: item.price * 0.995 },
          { time: 'Nov 28', price: item.price },
        ],
        '1M': [
          { time: 'Nov 01', price: item.price * 0.95 },
          { time: 'Nov 14', price: item.price * 0.97 },
          { time: 'Nov 28', price: item.price },
        ],
        '1Y': [
          { time: 'Dec 23', price: item.price * 0.85 },
          { time: 'Jun 24', price: item.price * 0.92 },
          { time: 'Nov 24', price: item.price },
        ],
        '5Y': [
          { time: '2020', price: item.price * 0.7 },
          { time: '2022', price: item.price * 0.82 },
          { time: '2024', price: item.price },
        ],
        'ALL': [
          { time: '2000', price: item.price * 0.5 },
          { time: '2015', price: item.price * 0.65 },
          { time: '2024', price: item.price },
        ],
      },
    };
    setSelectedItem(worldIndexAsMarketItem);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  // When a multi-asset item is clicked (crypto, commodity, bond)
  const handleSelectMultiAsset = (
    type: string,
    name: string,
    symbol: string,
    priceStr: string,
    changeStr: string
  ) => {
    const rawPrice = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 100;
    const rawChange = parseFloat(changeStr.replace(/[^0-9.-]/g, '')) || 0;
    const isPos = !changeStr.includes('-');

    const assetItem: MarketItem = {
      id: symbol.toLowerCase(),
      name,
      symbol,
      exchange: type,
      price: rawPrice,
      change: (rawPrice * rawChange) / 100,
      changePercent: rawChange,
      isPositive: isPos,
      type: type as any,
      category: type === 'CRYPTO' ? 'Crypto' : type === 'COMMODITY' ? 'Futures' : 'Bonds',
      badge: {
        text: symbol.slice(0, 3),
        bgColor: type === 'CRYPTO' ? '#f59e0b' : type === 'COMMODITY' ? '#ea580c' : '#2563eb',
      },
      sparkline: [20, 24, 22, 28, 30],
      timeframeData: {
        '1D': [
          { time: '09:30', price: rawPrice * (isPos ? 0.98 : 1.01) },
          { time: '11:00', price: rawPrice * (isPos ? 0.985 : 1.008) },
          { time: '12:30', price: rawPrice * (isPos ? 0.992 : 1.005) },
          { time: '14:00', price: rawPrice * (isPos ? 0.996 : 1.002) },
          { time: '15:30', price: rawPrice * (isPos ? 0.998 : 1.001) },
          { time: '16:00', price: rawPrice },
        ],
        '5D': [
          { time: 'Nov 24', price: rawPrice * 0.95 },
          { time: 'Nov 25', price: rawPrice * 0.97 },
          { time: 'Nov 26', price: rawPrice * 0.98 },
          { time: 'Nov 27', price: rawPrice * 0.99 },
          { time: 'Nov 28', price: rawPrice },
        ],
        '1M': [
          { time: 'Nov 01', price: rawPrice * 0.9 },
          { time: 'Nov 14', price: rawPrice * 0.94 },
          { time: 'Nov 28', price: rawPrice },
        ],
        '1Y': [
          { time: 'Dec 23', price: rawPrice * 0.75 },
          { time: 'Jun 24', price: rawPrice * 0.88 },
          { time: 'Nov 24', price: rawPrice },
        ],
        '5Y': [
          { time: '2020', price: rawPrice * 0.4 },
          { time: '2022', price: rawPrice * 0.65 },
          { time: '2024', price: rawPrice },
        ],
        'ALL': [
          { time: '2015', price: rawPrice * 0.2 },
          { time: '2020', price: rawPrice * 0.4 },
          { time: '2024', price: rawPrice },
        ],
      },
    };

    setSelectedItem(assetItem);
    window.scrollTo({ top: 220, behavior: 'smooth' });
  };

  const handleCategorySelect = (category: MarketCategory) => {
    setActiveCategory(category);
    if (category === 'Indices') {
      setSelectedItem(TOP_INDICES[0]);
    } else if (category === 'US stocks') {
      handleSelectStock(MOST_ACTIVE_STOCKS[0]);
    } else if (category === 'World stocks') {
      handleSelectWorldIndex(WORLD_INDICES[0]);
    } else if (category === 'Crypto') {
      handleSelectMultiAsset('CRYPTO', 'Bitcoin', 'BTC', '$96,450.00', '+2.10%');
    } else if (category === 'Futures') {
      handleSelectMultiAsset('COMMODITY', 'Gold', 'GC1!', '$2,642.50', '+0.75%');
    } else if (category === 'Bonds') {
      handleSelectMultiAsset('BOND', 'US 10Y', 'US10Y', '4.24%', '-0.038');
    }
  };

  return (
    <div className="min-h-screen bg-white text-tv-black flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Hero Header */}
      <Hero region={region} setRegion={setRegion} />

      {/* Category Navigation Pills */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Indices Showcase Section */}
        <div className="space-y-6">
          <TopTickers
            indices={TOP_INDICES}
            selectedItem={selectedItem}
            onSelectItem={(item) => setSelectedItem(item)}
            onViewAllIndices={() => setIsWorldIndicesOpen(true)}
          />

          {/* Featured Interactive Chart Widget */}
          <InteractiveChart
            item={selectedItem}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            onOpenFullChart={() => setIsFullChartOpen(true)}
          />
        </div>

        {/* World Indices & Most Active Stocks Grid */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          data-purpose="major-markets-tables"
          id="major-markets-tables"
        >
          <WorldIndices
            indices={WORLD_INDICES}
            onSelectIndex={handleSelectWorldIndex}
            onSeeAll={() => setIsWorldIndicesOpen(true)}
          />

          <MostActiveStocks
            stocks={MOST_ACTIVE_STOCKS}
            onSelectStock={handleSelectStock}
            onOpenScreener={() => setIsScreenerOpen(true)}
          />
        </section>

        {/* Multi Asset Overview Section */}
        <MultiAssetCards
          cryptoList={CRYPTO_ASSETS}
          commoditiesList={COMMODITIES}
          yieldsList={TREASURY_YIELDS}
          onSelectItem={handleSelectMultiAsset}
        />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Interactive Modals */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(item) => setSelectedItem(item)}
      />

      <FullChartModal
        isOpen={isFullChartOpen}
        onClose={() => setIsFullChartOpen(false)}
        item={selectedItem}
      />

      <ScreenerModal
        isOpen={isScreenerOpen}
        onClose={() => setIsScreenerOpen(false)}
        onSelectStock={handleSelectStock}
      />

      <WorldIndicesModal
        isOpen={isWorldIndicesOpen}
        onClose={() => setIsWorldIndicesOpen(false)}
        onSelectIndex={handleSelectWorldIndex}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
