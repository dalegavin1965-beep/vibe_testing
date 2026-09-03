import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div
      id="get-started-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tv-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-tv-border overflow-hidden p-6 text-center animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-1 text-tv-gray hover:text-tv-black rounded-lg hover:bg-tv-lightGray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2962ff] to-[#9c27b0] text-white mx-auto flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 22H7V6h7v16zm8-11h-7V6h7v5zm8-5h-7V6h7v0zm0 16h-7v-8h7v8z"></path>
                <path clipRule="evenodd" d="M0 0h12v4H4v20h8v4H0V0zm24 24h8V4h-8V0h12v28H24v-4z" fillRule="evenodd"></path>
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-tv-black mb-1">
              Join 50M+ traders and investors
            </h3>
            <p className="text-sm text-tv-gray mb-6">
              Track global markets, chart customized indicators, and discover trading ideas in real time.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl border border-tv-border text-tv-black placeholder-tv-gray focus:ring-2 focus:ring-tv-blue outline-none text-sm"
              />
              <button
                type="submit"
                className="w-full nav-btn-gradient text-white py-2.5 rounded-xl font-semibold text-sm shadow-sm cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-xs text-tv-gray mt-4">
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <CheckCircle className="w-16 h-16 text-tv-green mx-auto stroke-1" />
            <h3 className="text-xl font-bold text-tv-black">Welcome to TradingView!</h3>
            <p className="text-sm text-tv-gray">
              We've prepared your live markets workspace for <span className="font-semibold text-tv-black">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-tv-lightGray text-tv-black font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              Explore Markets
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
