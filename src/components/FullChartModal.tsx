import React, { useState } from 'react';
import { X, BarChart2, TrendingUp, Sliders, Maximize2 } from 'lucide-react';
import { MarketItem, Timeframe, ChartPoint } from '../types';

interface FullChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MarketItem;
}

export const FullChartModal: React.FC<FullChartModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<'area' | 'candle'>('area');
  const [showVolume, setShowVolume] = useState(true);
  const [showSMA, setShowSMA] = useState(true);

  if (!isOpen) return null;

  const points: ChartPoint[] = (item.timeframeData && item.timeframeData[timeframe]) || [
    { time: '09:30', price: item.price * 0.995 },
    { time: '11:00', price: item.price * 0.992 },
    { time: '12:30', price: item.price * 0.998 },
    { time: '14:00', price: item.price * 1.002 },
    { time: '15:30', price: item.price * 1.003 },
    { time: '16:00', price: item.price },
  ];

  const minPrice = Math.min(...points.map((p) => p.price));
  const maxPrice = Math.max(...points.map((p) => p.price));
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 900;
  const svgHeight = 360;
  const paddingY = 40;
  const chartHeight = svgHeight - paddingY * 2;

  const coords = points.map((p, idx) => {
    const x = (idx / (points.length - 1)) * svgWidth;
    const normalizedPrice = (p.price - minPrice) / priceRange;
    const y = svgHeight - paddingY - normalizedPrice * chartHeight;
    return { x, y, point: p };
  });

  const pathD = coords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M${curr.x},${curr.y}` : `${acc} L${curr.x},${curr.y}`;
  }, '');

  const polygonPoints = `0,${svgHeight} ${coords.map((c) => `${c.x},${c.y}`).join(' ')} ${svgWidth},${svgHeight}`;
  const strokeColor = item.isPositive ? '#089981' : '#f23645';

  return (
    <div
      id="full-interactive-chart-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-tv-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-tv-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center"
              style={{ backgroundColor: item.badge?.bgColor || '#2962ff' }}
            >
              {item.badge?.text || item.name.slice(0, 2)}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-tv-black">{item.name}</h3>
                <span className="text-xs bg-tv-lightGray px-2 py-0.5 rounded text-tv-gray font-semibold">
                  {item.symbol}
                </span>
                <span className="text-xs bg-tv-lightGray px-2 py-0.5 rounded text-tv-gray font-semibold">
                  {item.type || 'INDEX'}
                </span>
              </div>
              <p className="text-xs text-tv-gray">Real-time Professional Trading View</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right mr-2 hidden sm:block">
              <div className="font-bold text-lg text-tv-black">
                ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div
                className={`text-xs font-semibold ${
                  item.isPositive ? 'text-tv-green' : 'text-tv-red'
                }`}
              >
                {item.isPositive ? '▲ +' : '▼ '}
                {item.change.toFixed(2)} ({item.isPositive ? '+' : ''}
                {item.changePercent.toFixed(2)}%)
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-tv-gray hover:text-tv-black rounded-lg hover:bg-tv-lightGray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2 bg-tv-lightGray/40 border-b border-tv-border flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Timeframes */}
          <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-tv-border">
            {(['1D', '5D', '1M', '1Y', '5Y', 'ALL'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                  timeframe === tf
                    ? 'bg-tv-lightGray text-tv-black shadow-xs'
                    : 'text-tv-gray hover:text-tv-black'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicators Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSMA(!showSMA)}
              className={`px-2.5 py-1 rounded border text-xs font-semibold transition-colors ${
                showSMA
                  ? 'border-tv-blue text-tv-blue bg-blue-50/50'
                  : 'border-tv-border text-tv-gray hover:bg-white'
              }`}
            >
              SMA (20)
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2.5 py-1 rounded border text-xs font-semibold transition-colors ${
                showVolume
                  ? 'border-tv-blue text-tv-blue bg-blue-50/50'
                  : 'border-tv-border text-tv-gray hover:bg-white'
              }`}
            >
              Volume
            </button>
            <button
              onClick={() => setChartType(chartType === 'area' ? 'candle' : 'area')}
              className="px-2.5 py-1 rounded border border-tv-border text-tv-black font-semibold bg-white hover:bg-tv-lightGray"
            >
              {chartType === 'area' ? 'Candles' : 'Area'}
            </button>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="p-4 sm:p-6 flex-1 min-h-[360px] relative select-none">
          <svg
            className="w-full h-80"
            preserveAspectRatio="none"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          >
            <defs>
              <linearGradient id="fullChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line stroke="#f0f3fa" strokeDasharray="4 4" x1="0" x2={svgWidth} y1="60" y2="60" />
            <line stroke="#f0f3fa" strokeDasharray="4 4" x1="0" x2={svgWidth} y1="140" y2="140" />
            <line stroke="#f0f3fa" strokeDasharray="4 4" x1="0" x2={svgWidth} y1="220" y2="220" />
            <line stroke="#f0f3fa" strokeDasharray="4 4" x1="0" x2={svgWidth} y1="300" y2="300" />

            {/* Volume bars if enabled */}
            {showVolume &&
              coords.map((c, i) => {
                const barHeight = 20 + (i % 5) * 8;
                return (
                  <rect
                    key={i}
                    x={c.x - 4}
                    y={svgHeight - barHeight}
                    width={8}
                    height={barHeight}
                    fill={strokeColor}
                    opacity="0.2"
                  />
                );
              })}

            {/* Fill polygon */}
            <polygon fill="url(#fullChartGrad)" points={polygonPoints} />

            {/* Area Path */}
            <path
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />

            {/* SMA Line simulation if enabled */}
            {showSMA && (
              <path
                d={coords
                  .map((c, i) => {
                    const smaY = c.y + (i % 2 === 0 ? 5 : -4);
                    return `${i === 0 ? 'M' : 'L'}${c.x},${smaY}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#2962ff"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
            )}

            {/* Live point */}
            <circle
              cx={coords[coords.length - 1]?.x || 0}
              cy={coords[coords.length - 1]?.y || 0}
              fill={strokeColor}
              r="5"
            />
          </svg>

          {/* Time axis */}
          <div className="flex justify-between text-xs text-tv-gray pt-2 border-t border-tv-border">
            {points.map((p, idx) => (
              <span key={idx}>{p.time}</span>
            ))}
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-tv-lightGray/40 border-t border-tv-border text-xs">
          <div>
            <span className="text-tv-gray">Day's Range:</span>
            <span className="font-semibold text-tv-black ml-1.5">
              ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-tv-gray">52 Wk High:</span>
            <span className="font-semibold text-tv-black ml-1.5">
              ${(maxPrice * 1.05).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-tv-gray">52 Wk Low:</span>
            <span className="font-semibold text-tv-black ml-1.5">
              ${(minPrice * 0.88).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-tv-gray">Status:</span>
            <span className="font-semibold text-tv-green ml-1.5">Real-time quote</span>
          </div>
        </div>
      </div>
    </div>
  );
};
