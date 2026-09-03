import React, { useState, useEffect } from 'react';
import { Search, Globe, User, Check, X } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  activeNav,
  setActiveNav,
  onOpenGetStarted,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JA', name: '日本語' },
    { code: 'ZH', name: '简体中文' },
  ];

  // Close menus on outside click
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [onOpenSearch]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-tv-border" id="main-header">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Side: Brand Logo, Search, Main Nav */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* TradingView Brand Logo Mark */}
          <a
            id="brand-logo"
            aria-label="TradingView Home"
            className="flex items-center space-x-2 text-black hover:opacity-85 transition-opacity"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 22H7V6h7v16zm8-11h-7V6h7v5zm8-5h-7V6h7v0zm0 16h-7v-8h7v8z"></path>
              <path clipRule="evenodd" d="M0 0h12v4H4v20h8v4H0V0zm24 24h8V4h-8V0h12v28H24v-4z" fillRule="evenodd"></path>
            </svg>
          </a>

          {/* Pill Search Bar with shortcut indicator */}
          <div className="relative w-44 sm:w-64" onClick={onOpenSearch}>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-tv-gray">
              <Search className="w-4 h-4 stroke-2" />
            </div>
            <input
              id="header-search-input"
              className="w-full pl-10 pr-4 py-2 bg-tv-lightGray hover:bg-slate-200/70 border-none rounded-full text-sm font-normal text-tv-black placeholder-tv-gray focus:ring-2 focus:ring-tv-blue outline-none transition-all cursor-pointer select-none"
              placeholder="Search (Ctrl+K)"
              readOnly
              type="text"
            />
          </div>

          {/* Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-6 text-[15px] font-medium text-tv-black">
            {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  id={`nav-${item.toLowerCase()}`}
                  onClick={() => setActiveNav(item)}
                  className={`transition-colors relative py-5 font-medium ${
                    isActive
                      ? 'text-tv-blue font-semibold hover:text-tv-blue'
                      : 'text-tv-black hover:text-tv-blue'
                  }`}
                >
                  {item}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-tv-blue rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Locale, Profile, CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Language selector */}
          <div className="relative">
            <button
              id="lang-selector-btn"
              aria-label="Select Language"
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowProfileMenu(false);
              }}
              className="hidden sm:flex items-center space-x-1 text-sm font-medium hover:text-tv-blue transition-colors p-1.5 rounded-md hover:bg-tv-lightGray text-tv-black"
            >
              <Globe className="w-5 h-5 stroke-[1.8]" />
              <span className="text-sm font-semibold tracking-wide ml-1">{selectedLang}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-tv-border py-1.5 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-tv-lightGray flex items-center justify-between text-tv-black"
                  >
                    <span>{lang.name}</span>
                    {selectedLang === lang.code && <Check className="w-4 h-4 text-tv-blue" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Icon */}
          <div className="relative">
            <button
              id="user-profile-btn"
              aria-label="User Account"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowLangMenu(false);
              }}
              className="p-2 hover:bg-tv-lightGray rounded-full transition-colors text-tv-black"
            >
              <User className="w-5 h-5 stroke-2" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-tv-border py-2 z-50 text-sm">
                <div className="px-4 py-2 border-b border-tv-border">
                  <p className="font-semibold text-tv-black">Guest Investor</p>
                  <p className="text-xs text-tv-gray">Free account tier</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenGetStarted();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-tv-lightGray text-tv-blue font-medium"
                >
                  Sign in or Register
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-4 py-2 hover:bg-tv-lightGray text-tv-black"
                >
                  Dark theme: Off
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-4 py-2 hover:bg-tv-lightGray text-tv-black"
                >
                  Help center
                </button>
              </div>
            )}
          </div>

          {/* Vibrant Gradient CTA Button */}
          <button
            id="btn-get-started"
            onClick={onOpenGetStarted}
            className="nav-btn-gradient text-white text-sm font-semibold px-4 py-2 rounded-lg sm:rounded-full shadow-sm cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
