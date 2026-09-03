import React from 'react';
import { MarketCategory } from '../types';

interface CategoryNavProps {
  activeCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
}

export const CATEGORIES: MarketCategory[] = [
  'Indices',
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Bonds',
  'ETFs',
  'Economy',
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section
      id="category-navigation-bar"
      className="border-b border-tv-border/80 sticky top-16 bg-white/95 backdrop-blur-md z-40 py-2.5"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-sm font-medium py-0.5">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                id={`cat-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-tv-lightGray text-tv-black font-semibold shadow-xs'
                    : 'text-tv-gray hover:text-tv-black hover:bg-tv-lightGray font-medium'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
