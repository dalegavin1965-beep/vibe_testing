import React, { useState, useRef } from 'react';
import { MarketItem, Timeframe, ChartPoint } from '../types';
import { ExternalLink } from 'lucide-react';

interface InteractiveChartProps {
  item: MarketItem;
  timeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  onOpenFullChart: () => void;
}

const TIMEFRAMES: Timeframe[] = ['1D', '5D', '1M', '1Y', '5Y', 'ALL'];

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  item,
  timeframe,
  setTimeframe,
  onOpenFullChart,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number; svgX: number; svgY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get data points for current timeframe
  const points: ChartPoint[] = (item.timeframeData && item.timeframeData[timeframe]) || [
    { time: '09:30', price: item.price * 0.996 },
    { time: '11:00', price: item.price * 0.994 },
    { time: '12:30', price: item.price * 0.998 },
    { time: '14:00', price: item.price * 1.001 },
    { time: '15:30', price: item.price * 1.002 },
    { time: '16:00', price: item.price },
  ];

  const minPrice = Math.min(...points.map((p) => p.price));
  const maxPrice = Math.max(...points.map((p) => p.price));
  const priceRange = maxPrice - minPrice || 1;

  // Chart coordinate space
  const svgWidth = 800;
  const svgHeight = 240;
  const paddingY = 30;
  const chartHeight = svgHeight - paddingY * 2;

  // Coordinate mapper
  const getCoordinates = (p: ChartPoint, index: number) => {
    const x = (index / (points.length - 1)) * svgWidth;
    // higher price = smaller Y
    const normalizedPrice = (p.price - minPrice) / priceRange;
    const y = svgHeight - paddingY - normalizedPrice * chartHeight;
    return { x, y };
  };

  const coords = points.map((p, idx) => getCoordinates(p, idx));

  // Build SVG path
  const pathD = coords.reduce((acc, curr, idx) => {
    return idx === 0 ? `M${curr.x},${curr.y}` : `${acc} L${curr.x},${curr.y}`;
  }, '');

  // Fill polygon
  const polygonPoints = `0,${svgHeight} ${coords.map((c) => `${c.x},${c.y}`).join(' ')} ${svgWidth},${svgHeight}`;

  const lastCoord = coords[coords.length - 1];
  const isPos = item.isPositive;
  const strokeColor = isPos ? '#089981' : '#f23645';

  const currentPrice = hoveredPoint ? hoveredPoint.price : item.price;
  const currentDiff = hoveredPoint
    ? hoveredPoint.price - points[0].price
    : item.change;
  const currentDiffPercent = hoveredPoint
    ? ((hoveredPoint.price - points[0].price) / points[0].price) * 100
    : item.changePercent;
  const isCurrentPos = currentDiff >= 0;

  // Handle cursor move for crosshair
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeXRatio = Math.max(0, Math.min(1, relativeX / rect.width));

    // Find closest data point
    const index = Math.round(relativeXRatio * (points.length - 1));
    const point = points[index];
    const pointCoord = coords[index];

    setHoveredPoint(point);
    setHoverPosition({
      x: relativeX,
      y: (pointCoord.y / svgHeight) * rect.height,
      svgX: pointCoord.x,
      svgY: pointCoord.y,
    });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setHoverPosition(null);
  };

  return (
    <div
      className="rounded-2xl border border-tv-border bg-white overflow-hidden p-6 shadow-xs"
      id="featured-chart-widget"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-tv-border/60 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl text-tv-black">{item.name}</span>
            <span className="text-xs font-semibold bg-tv-lightGray px-2 py-0.5 rounded text-tv-gray">
              {item.type || 'INDEX'}
            </span>
            {item.symbol && (
              <span className="text-xs text-tv-gray font-normal hidden sm:inline">
                {item.symbol}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-1">
            <span className="text-3xl font-extrabold text-tv-black tracking-tight">
              {currentPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>

            <span
              className={`text-sm font-semibold flex items-center ${
                isCurrentPos ? 'text-tv-green' : 'text-tv-red'
              }`}
            >
              {isCurrentPos ? '▲ +' : '▼ '}
              {Math.abs(currentDiff).toFixed(2)} ({isCurrentPos ? '+' : ''}
              {currentDiffPercent.toFixed(2)}%)
            </span>

            <span className="text-xs text-tv-gray">
              {hoveredPoint ? `${hoveredPoint.time} EST` : 'Nov 28, 16:00 EST'}
            </span>
          </div>
        </div>

        {/* Timeframe buttons & Chart launcher */}
        <div className="flex items-center space-x-3 self-start md:self-auto">
          <div className="inline-flex bg-tv-lightGray p-1 rounded-lg text-xs font-semibold">
            {TIMEFRAMES.map((tf) => {
              const active = timeframe === tf;
              return (
                <button
                  key={tf}
                  id={`tf-btn-${tf}`}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    active
                      ? 'bg-white text-tv-black shadow-xs font-bold'
                      : 'text-tv-gray hover:text-tv-black'
                  }`}
                >
                  {tf}
                </button>
              );
            })}
          </div>

          <button
            id="open-full-chart-btn"
            onClick={onOpenFullChart}
            className="text-xs font-bold text-tv-blue hover:text-tv-blueHover flex items-center space-x-1 pl-2 cursor-pointer transition-colors"
          >
            <span>Full interactive chart</span>
            <ExternalLink className="w-4 h-4 stroke-2" />
          </button>
        </div>
      </div>

      {/* Chart Canvas Viewport */}
      <div
        ref={containerRef}
        className="relative w-full h-64 mt-4 select-none cursor-crosshair"
        data-purpose="chart-container"
      >
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          <line
            stroke="#f0f3fa"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0"
            x2={svgWidth}
            y1="40"
            y2="40"
          />
          <line
            stroke="#f0f3fa"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0"
            x2={svgWidth}
            y1="100"
            y2="100"
          />
          <line
            stroke="#f0f3fa"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0"
            x2={svgWidth}
            y1="160"
            y2="160"
          />
          <line
            stroke="#f0f3fa"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0"
            x2={svgWidth}
            y1="220"
            y2="220"
          />

          {/* Fill Area */}
          <polygon fill="url(#chartGradient)" points={polygonPoints} />

          {/* Area Path Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />

          {/* Live Indicator Point at end (when not hovering) */}
          {!hoverPosition && lastCoord && (
            <>
              <circle cx={lastCoord.x} cy={lastCoord.y} fill={strokeColor} r="4.5" />
              <circle
                className="animate-ping origin-center"
                cx={lastCoord.x}
                cy={lastCoord.y}
                fill={strokeColor}
                opacity="0.25"
                r="9"
              />
            </>
          )}

          {/* Hover Crosshair and dynamic point */}
          {hoverPosition && (
            <>
              {/* Vertical crosshair line */}
              <line
                x1={hoverPosition.svgX}
                y1={0}
                x2={hoverPosition.svgX}
                y2={svgHeight}
                stroke="#787b86"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* Horizontal crosshair line */}
              <line
                x1={0}
                y1={hoverPosition.svgY}
                x2={svgWidth}
                y2={hoverPosition.svgY}
                stroke="#787b86"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* Hovered point marker */}
              <circle
                cx={hoverPosition.svgX}
                cy={hoverPosition.svgY}
                fill="#ffffff"
                stroke={strokeColor}
                strokeWidth="3"
                r="5"
              />
            </>
          )}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverPosition && hoveredPoint && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 bg-tv-black text-white px-2.5 py-1.5 rounded-md shadow-lg text-xs z-20 whitespace-nowrap"
            style={{
              left: `${hoverPosition.x}px`,
              top: `${hoverPosition.y}px`,
            }}
          >
            <div className="font-bold">
              {hoveredPoint.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-gray-300">{hoveredPoint.time}</div>
          </div>
        )}

        {/* Axis Labels */}
        <div className="flex justify-between text-[11px] font-medium text-tv-gray pt-2 border-t border-tv-border/40">
          {points.length > 5 ? (
            <>
              <span>{points[0].time}</span>
              <span>{points[Math.floor(points.length * 0.2)].time}</span>
              <span>{points[Math.floor(points.length * 0.4)].time}</span>
              <span>{points[Math.floor(points.length * 0.6)].time}</span>
              <span>{points[Math.floor(points.length * 0.8)].time}</span>
              <span>{points[points.length - 1].time}</span>
            </>
          ) : (
            points.map((p, i) => <span key={i}>{p.time}</span>)
          )}
        </div>
      </div>
    </div>
  );
};
