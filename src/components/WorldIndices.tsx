import React from 'react';
import { WorldIndexItem } from '../types';

interface WorldIndicesProps {
  indices: WorldIndexItem[];
  onSelectIndex: (item: WorldIndexItem) => void;
  onSeeAll: () => void;
}

export const WorldIndices: React.FC<WorldIndicesProps> = ({
  indices,
  onSelectIndex,
  onSeeAll,
}) => {
  return (
    <div className="rounded-xl border border-tv-border bg-white p-5" id="world-indices-card">
      <div className="flex items-center justify-between pb-4 border-b border-tv-border/80">
        <h3 className="text-lg font-bold text-tv-black">World Indices</h3>
        <button
          onClick={onSeeAll}
          id="see-all-world-indices"
          className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer"
        >
          See all
        </button>
      </div>

      <div className="divide-y divide-tv-border/60">
        {indices.map((item) => (
          <div
            key={item.symbol}
            id={`world-index-${item.symbol.toLowerCase()}`}
            onClick={() => onSelectIndex(item)}
            className="py-3.5 flex items-center justify-between hover:bg-tv-hover/70 px-2 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold w-7 text-center py-0.5 rounded bg-tv-lightGray text-tv-black">
                {item.countryCode}
              </span>
              <div>
                <p className="text-sm font-bold text-tv-black leading-snug">{item.name}</p>
                <p className="text-xs text-tv-gray">
                  {item.symbol} • {item.city}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-tv-black">
                {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <span
                className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${
                  item.isPositive
                    ? 'text-tv-green bg-green-50'
                    : 'text-tv-red bg-red-50'
                }`}
              >
                {item.isPositive ? '+' : ''}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
