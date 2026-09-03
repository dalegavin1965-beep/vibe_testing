import React, { useState } from 'react';
import { X, ArrowUpDown, Filter } from 'lucide-react';
import { StockItem } from '../types';
import { EXTENDED_STOCKS } from '../data/marketData';

interface ScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock: (stock: StockItem) => void;
}

export const ScreenerModal: React.FC<ScreenerModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
}) => {
  const [filterSector, setFilterSector] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'change' | 'price' | 'name'>('change');

  if (!isOpen) return null;

  const sectors = ['All', 'Semiconductors', 'EV & Tech', 'Software', 'Consumer Electronics'];

  const filtered = EXTENDED_STOCKS.filter(
    (s) => filterSector === 'All' || s.sector.includes(filterSector)
  ).sort((a, b) => {
    if (sortBy === 'change') return b.changePercent - a.changePercent;
    if (sortBy === 'price') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div
      id="screener-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-tv-border flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-tv-black">Stock Screener — Most Active</h3>
            <p className="text-xs text-tv-gray">Filter US market equities by performance and industry</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-tv-gray hover:text-tv-black rounded-lg hover:bg-tv-lightGray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-5 py-2.5 bg-tv-lightGray/40 border-b border-tv-border flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            <span className="text-tv-gray font-medium mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Sector:
            </span>
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setFilterSector(sec)}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  filterSector === sec
                    ? 'bg-tv-black text-white font-semibold'
                    : 'bg-white text-tv-gray hover:text-tv-black border border-tv-border'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-tv-gray">Sort by:</span>
            <button
              onClick={() => setSortBy(sortBy === 'change' ? 'price' : 'change')}
              className="px-2 py-1 bg-white border border-tv-border rounded text-tv-black font-semibold flex items-center space-x-1"
            >
              <span>{sortBy.toUpperCase()}</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Screener list */}
        <div className="max-h-96 overflow-y-auto divide-y divide-tv-border">
          {filtered.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => {
                onSelectStock(stock);
                onClose();
              }}
              className="px-5 py-3 flex items-center justify-between hover:bg-tv-hover cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: stock.avatar.bgColor }}
                >
                  {stock.avatar.text === '' ? (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12.01-14.42-6.53-9.9-11.53-20.98-15-33.24-3.48-12.27-5.22-23.77-5.22-34.52 0-14.77 3.73-26.68 11.2-35.73 7.46-9.05 16.79-13.68 27.97-13.9 5.86 0 12.11 1.63 18.77 4.9 6.66 3.26 10.98 4.94 12.98 5.03 1.63 0 6.13-1.74 13.5-5.21 7.37-3.48 13.82-5.06 19.35-4.75 14.34.87 25.5 6.46 33.49 16.78-12.82 7.72-19.01 18.36-18.57 31.95.43 10.65 4.54 19.56 12.32 26.73 3.91 3.69 8.27 6.41 13.08 8.15-2.61 7.82-5.98 16.08-10.1 24.77zM119.22 31.84c0-7.39 2.66-14.34 7.99-20.86 5.33-6.52 11.85-10.65 19.57-12.38.33 1.2.49 2.28.49 3.26 0 7.28-2.83 14.34-8.48 21.19-5.65 6.85-12.39 10.87-20.21 12.06-.22-1.09-.36-2.18-.36-3.27z" />
                    </svg>
                  ) : (
                    stock.avatar.text
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-tv-black">{stock.name}</div>
                  <div className="text-xs text-tv-gray">
                    {stock.symbol} • {stock.sector}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-sm text-tv-black">${stock.price.toFixed(2)}</div>
                <div
                  className={`text-xs font-semibold px-2 py-0.5 rounded inline-block ${
                    stock.isPositive ? 'text-tv-green bg-green-50' : 'text-tv-red bg-red-50'
                  }`}
                >
                  {stock.isPositive ? '+' : ''}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
