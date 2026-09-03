import React from 'react';
import { X } from 'lucide-react';
import { WorldIndexItem } from '../types';
import { EXTENDED_WORLD_INDICES } from '../data/marketData';

interface WorldIndicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (item: WorldIndexItem) => void;
}

export const WorldIndicesModal: React.FC<WorldIndicesModalProps> = ({
  isOpen,
  onClose,
  onSelectIndex,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="world-indices-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-tv-border flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-tv-black">Major World Indices</h3>
            <p className="text-xs text-tv-gray">Global benchmark equity indices & performance</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-tv-gray hover:text-tv-black rounded-lg hover:bg-tv-lightGray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-tv-border">
          {EXTENDED_WORLD_INDICES.map((item) => (
            <div
              key={item.symbol}
              onClick={() => {
                onSelectIndex(item);
                onClose();
              }}
              className="px-5 py-3.5 flex items-center justify-between hover:bg-tv-hover cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold w-8 text-center py-1 rounded bg-tv-lightGray text-tv-black">
                  {item.countryCode}
                </span>
                <div>
                  <p className="text-sm font-bold text-tv-black">{item.name}</p>
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
                    item.isPositive ? 'text-tv-green bg-green-50' : 'text-tv-red bg-red-50'
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
    </div>
  );
};
