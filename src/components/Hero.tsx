import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface HeroProps {
  region: string;
  setRegion: (region: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ region, setRegion }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const regions = [
    'everywhere',
    'Americas',
    'Europe & UK',
    'Asia-Pacific',
    'Emerging Markets',
  ];

  return (
    <section className="pt-10 pb-6 text-center" data-purpose="markets-hero" id="markets-hero">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative inline-block">
          <button
            id="region-selector-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center justify-center space-x-2 group cursor-pointer hover:opacity-85 transition-opacity"
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-tv-black capitalize">
              Markets, {region}
            </h1>
            <ChevronDown
              className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[3] text-tv-black transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-tv-border py-2 z-30 text-left">
              <div className="px-3 py-1.5 text-xs font-semibold text-tv-gray uppercase tracking-wider">
                Select Market Scope
              </div>
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRegion(r);
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-sm hover:bg-tv-lightGray flex items-center justify-between text-tv-black font-medium capitalize"
                >
                  <span>Markets, {r}</span>
                  {region.toLowerCase() === r.toLowerCase() && (
                    <Check className="w-4 h-4 text-tv-blue stroke-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-tv-gray">
          Global financial quotes, real-time index dynamics, charts, and trading data
        </p>
      </div>
    </section>
  );
};
