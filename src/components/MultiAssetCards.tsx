import React from 'react';
import { CryptoItem, CommodityItem, YieldItem } from '../types';

interface MultiAssetCardsProps {
  cryptoList: CryptoItem[];
  commoditiesList: CommodityItem[];
  yieldsList: YieldItem[];
  onSelectItem: (type: string, name: string, symbol: string, price: string, change: string) => void;
}

export const MultiAssetCards: React.FC<MultiAssetCardsProps> = ({
  cryptoList,
  commoditiesList,
  yieldsList,
  onSelectItem,
}) => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
      data-purpose="crypto-commodities-bonds"
      id="multi-asset-overview-section"
    >
      {/* Crypto Highlight Card */}
      <div className="trading-card rounded-xl border border-tv-border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <h4 className="font-bold text-base text-tv-black">Crypto Assets</h4>
          </div>
          <span className="text-xs font-semibold text-tv-gray">24h Vol $128B</span>
        </div>

        <div className="space-y-3">
          {cryptoList.map((item, idx) => (
            <div
              key={item.symbol}
              onClick={() => onSelectItem('CRYPTO', item.name, item.symbol, item.price, item.changePercent)}
              className={`flex items-center justify-between text-sm py-1.5 cursor-pointer hover:bg-tv-hover px-1.5 rounded transition-colors ${
                idx !== cryptoList.length - 1 ? 'border-b border-tv-border/50' : ''
              }`}
            >
              <div>
                <span className="font-bold text-tv-black">{item.symbol}</span>
                <span className="text-xs text-tv-gray ml-1.5">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-tv-black">{item.price}</div>
                <div
                  className={`text-xs font-semibold ${
                    item.isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {item.changePercent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Futures & Commodities Card */}
      <div className="trading-card rounded-xl border border-tv-border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <h4 className="font-bold text-base text-tv-black">Commodities</h4>
          </div>
          <span className="text-xs font-semibold text-tv-gray">Futures</span>
        </div>

        <div className="space-y-3">
          {commoditiesList.map((item, idx) => (
            <div
              key={item.symbol}
              onClick={() => onSelectItem('COMMODITY', item.name, item.symbol, item.price, item.changePercent)}
              className={`flex items-center justify-between text-sm py-1.5 cursor-pointer hover:bg-tv-hover px-1.5 rounded transition-colors ${
                idx !== commoditiesList.length - 1 ? 'border-b border-tv-border/50' : ''
              }`}
            >
              <div>
                <span className="font-bold text-tv-black">{item.name}</span>
                <span className="text-xs text-tv-gray ml-1.5">{item.symbol}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-tv-black">{item.price}</div>
                <div
                  className={`text-xs font-semibold ${
                    item.isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {item.changePercent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Bonds Yields Card */}
      <div className="trading-card rounded-xl border border-tv-border bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <h4 className="font-bold text-base text-tv-black">Treasury Yields</h4>
          </div>
          <span className="text-xs font-semibold text-tv-gray">Government</span>
        </div>

        <div className="space-y-3">
          {yieldsList.map((item, idx) => (
            <div
              key={item.symbol}
              onClick={() => onSelectItem('BOND', item.name, item.symbol, item.yield, item.change)}
              className={`flex items-center justify-between text-sm py-1.5 cursor-pointer hover:bg-tv-hover px-1.5 rounded transition-colors ${
                idx !== yieldsList.length - 1 ? 'border-b border-tv-border/50' : ''
              }`}
            >
              <div>
                <span className="font-bold text-tv-black">{item.name}</span>
                <span className="text-xs text-tv-gray ml-1.5">{item.symbol}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-tv-black">{item.yield}</div>
                <div
                  className={`text-xs font-semibold ${
                    item.isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
