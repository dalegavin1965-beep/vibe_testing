import React from 'react';
import { MarketItem } from '../types';
import { ChevronRight } from 'lucide-react';

interface TopTickersProps {
  indices: MarketItem[];
  selectedItem: MarketItem;
  onSelectItem: (item: MarketItem) => void;
  onViewAllIndices: () => void;
}

export const TopTickers: React.FC<TopTickersProps> = ({
  indices,
  selectedItem,
  onSelectItem,
  onViewAllIndices,
}) => {
  return (
    <section data-purpose="indices-snapshot" id="indices-snapshot-section">
      {/* Section Title matching UI: 'Indices >' */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onViewAllIndices}
          className="group inline-flex items-center space-x-1.5 cursor-pointer text-left"
          id="indices-header-link"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-tv-black group-hover:text-tv-blue transition-colors">
            Indices
          </h2>
          <ChevronRight className="w-6 h-6 stroke-[3] text-tv-black group-hover:text-tv-blue group-hover:translate-x-1 transition-all" />
        </button>

        <div className="flex items-center space-x-2 text-xs font-semibold text-tv-gray">
          <span className="w-2 h-2 rounded-full bg-tv-green animate-pulse"></span>
          <span>US Markets Open</span>
        </div>
      </div>

      {/* Quick Ticker Horizontal Cards matching image layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {indices.map((item) => {
          const isSelected = selectedItem.id === item.id;
          const isPos = item.isPositive;

          return (
            <div
              key={item.id}
              id={`ticker-card-${item.id}`}
              onClick={() => onSelectItem(item)}
              className={`trading-card p-4 rounded-xl border bg-white cursor-pointer transition-all duration-150 ${
                isSelected
                  ? 'border-tv-blue ring-1 ring-tv-blue shadow-md'
                  : 'border-tv-border hover:border-tv-blue'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {/* Circular badge */}
                  <span
                    className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: item.badge?.bgColor || '#f23645' }}
                  >
                    {item.badge?.text || '500'}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-tv-black leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-tv-gray">{item.symbol}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-semibold text-base text-tv-black">
                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`block text-xs font-semibold ${
                      isPos ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {isPos ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Mini SVG Sparkline */}
              <div className="mt-3 h-10 w-full">
                <svg
                  className={`w-full h-full fill-none ${
                    isPos ? 'stroke-tv-green' : 'stroke-tv-red'
                  }`}
                  preserveAspectRatio="none"
                  viewBox="0 0 200 40"
                >
                  {item.id === 'spx' && (
                    <path
                      d="M0,32 Q25,28 50,30 T100,18 T150,22 T200,8"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  )}
                  {item.id === 'ndx' && (
                    <path
                      d="M0,35 Q20,30 60,25 T110,28 T160,10 T200,5"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  )}
                  {item.id === 'dji' && (
                    <path
                      d="M0,10 Q30,12 70,18 T120,22 T160,35 T200,32"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
