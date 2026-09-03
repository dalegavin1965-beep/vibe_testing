import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<string | null>(null);

  return (
    <footer
      id="main-footer"
      className="mt-auto border-t border-tv-border bg-white py-6"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-tv-gray gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <span>© 2024 TradingView</span>
          <button
            onClick={() => setLegalModal('Terms of Use')}
            className="hover:underline cursor-pointer"
          >
            Terms of Use
          </button>
          <button
            onClick={() => setLegalModal('Privacy Policy')}
            className="hover:underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setLegalModal('Disclaimer')}
            className="hover:underline cursor-pointer"
          >
            Disclaimer
          </button>
        </div>

        <div>
          <span>Real-time quotes provided by major international exchanges.</span>
        </div>
      </div>

      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/40 backdrop-blur-xs"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl border border-tv-border"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-bold text-lg text-tv-black mb-2">{legalModal}</h4>
            <p className="text-sm text-tv-gray leading-relaxed mb-6">
              Financial market data, quotes, charts, and news feeds are provided for informational purposes only. Trading financial assets entails significant risk and may not be suitable for all investors.
            </p>
            <div className="text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-tv-lightGray text-tv-black rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
