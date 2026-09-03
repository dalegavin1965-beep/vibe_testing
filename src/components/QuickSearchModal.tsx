import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, DollarSign } from 'lucide-react';
import { MarketItem } from '../types';
import { TOP_INDICES, MOST_ACTIVE_STOCKS, CRYPTO_ASSETS, COMMODITIES, WORLD_INDICES } from '../data/marketData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MarketItem) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Flatten searchable list
  const allSearchable: MarketItem[] = [
    ...TOP_INDICES,
    ...MOST_ACTIVE_STOCKS.map((s) => ({
      id: s.symbol.toLowerCase(),
      name: s.name,
      symbol: s.symbol,
      exchange: s.exchange,
      price: s.price,
      change: (s.price * s.changePercent) / 100,
      changePercent: s.changePercent,
      isPositive: s.isPositive,
      type: 'STOCK' as const,
      category: 'US stocks' as const,
      sparkline: [20, 25, 30, 28, 35],
      badge: { text: s.avatar.text, bgColor: s.avatar.bgColor },
    })),
    ...WORLD_INDICES.map((w) => ({
      id: w.symbol.toLowerCase(),
      name: w.name,
      symbol: `${w.symbol} • ${w.city}`,
      exchange: w.city,
      price: w.price,
      change: (w.price * w.changePercent) / 100,
      changePercent: w.changePercent,
      isPositive: w.isPositive,
      type: 'INDEX' as const,
      category: 'World stocks' as const,
      sparkline: [15, 20, 18, 25, 22],
      badge: { text: w.countryCode, bgColor: '#475569' },
    })),
    ...CRYPTO_ASSETS.map((c) => ({
      id: c.symbol.toLowerCase(),
      name: c.name,
      symbol: `${c.symbol}USD`,
      exchange: 'Crypto',
      price: parseFloat(c.price.replace(/[$,]/g, '')),
      change: 0,
      changePercent: parseFloat(c.changePercent.replace(/[+%]/g, '')),
      isPositive: c.isPositive,
      type: 'CRYPTO' as const,
      category: 'Crypto' as const,
      sparkline: [10, 15, 25, 20, 30],
      badge: { text: c.symbol, bgColor: '#f59e0b' },
    })),
    ...COMMODITIES.map((cmd) => ({
      id: cmd.symbol.toLowerCase(),
      name: cmd.name,
      symbol: cmd.symbol,
      exchange: 'Futures',
      price: parseFloat(cmd.price.replace(/[$,]/g, '')),
      change: 0,
      changePercent: parseFloat(cmd.changePercent.replace(/[+%]/g, '')),
      isPositive: cmd.isPositive,
      type: 'COMMODITY' as const,
      category: 'Futures' as const,
      sparkline: [12, 14, 18, 16, 20],
      badge: { text: cmd.name.slice(0, 2), bgColor: '#ea580c' },
    })),
  ];

  const filtered = query.trim()
    ? allSearchable.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.symbol.toLowerCase().includes(query.toLowerCase())
      )
    : allSearchable.slice(0, 8);

  return (
    <div
      id="quick-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-tv-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-tv-border flex items-center space-x-3">
          <Search className="w-5 h-5 text-tv-gray stroke-2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search instruments, symbols, indices, stocks..."
            className="w-full outline-none text-base font-normal text-tv-black placeholder-tv-gray"
          />
          <button
            onClick={onClose}
            className="p-1 text-tv-gray hover:text-tv-black rounded-lg hover:bg-tv-lightGray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-tv-border/50">
          <div className="px-4 py-2 text-xs font-semibold text-tv-gray bg-tv-lightGray/50 flex justify-between">
            <span>{query ? 'SEARCH RESULTS' : 'POPULAR INSTRUMENTS'}</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-tv-gray text-sm">
              No matching assets found for "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id + item.symbol}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className="px-4 py-3 flex items-center justify-between hover:bg-tv-hover cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ backgroundColor: item.badge?.bgColor || '#2962ff' }}
                  >
                    {item.badge?.text || item.name[0]}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-tv-black">{item.name}</span>
                    <span className="ml-2 text-xs text-tv-gray">{item.symbol}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-tv-black">
                    ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      item.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {item.isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
