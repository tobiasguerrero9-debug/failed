import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import computerSmileImg from './assets/computer_smile.jpg';
import { scanToken } from './services/tokenScanner';
import { ScanResult } from './types/scanner';

export default function App() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenAddress.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await scanToken(tokenAddress);
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'No contract found at this address on Robinhood Chain. Check the contract address or chain.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeStyle = (label: string) => {
    switch (label) {
      case 'Low Risk':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Elevated':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'High Risk':
      case 'Probably Failed':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Unavailable':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  const getConfidenceBadgeStyle = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex flex-col justify-between select-none relative overflow-x-hidden">
      {/* Top Header */}
      <header className="w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between z-10">
        {/* Top-Left: Pixel FAILED logo */}
        <div className="font-pixel text-xl md:text-2xl font-bold tracking-tighter text-black uppercase">
          FAILED
        </div>

        {/* Top-Right: Nav Links */}
        <nav className="flex items-center space-x-6 md:space-x-8 text-sm md:text-base font-normal text-[#4c4266]">
          <a href="#data" className="hover:text-black transition-colors">
            Data
          </a>
          <a href="#docs" className="hover:text-black transition-colors">
            Docs
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            X
          </a>
        </nav>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-2 pb-12 z-10">
        {/* Retro 3D Computer Asset - CRT Screen remains ONLY the smile */}
        <div className="w-full max-w-[650px] sm:max-w-[750px] md:max-w-[850px] lg:max-w-[950px] flex justify-center items-center">
          <img
            src={computerSmileImg}
            alt="FAILED Retro 3D Computer"
            className="w-full h-auto object-contain pointer-events-none drop-shadow-xl"
            style={{
              mixBlendMode: 'multiply',
            }}
          />
        </div>

        {/* Input Bar Section */}
        <div className="w-full max-w-[480px] sm:max-w-[540px] md:max-w-[580px] mt-2 sm:mt-4 px-2">
          <form
            onSubmit={handleScan}
            className="w-full bg-[#f6f2fe]/90 backdrop-blur-sm border border-white/90 rounded-full p-1.5 sm:p-2 pl-4 sm:pl-5 flex items-center shadow-[0_15px_35px_-10px_rgba(130,110,180,0.3)] transition-shadow hover:shadow-[0_20px_40px_-10px_rgba(130,110,180,0.35)]"
          >
            {/* Link Icon */}
            <div className="text-[#8478a5] mr-3 flex-shrink-0">
              <Link2 className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Paste token address"
              className="w-full bg-transparent text-[#5c507c] placeholder-[#9c92b8] text-sm sm:text-base focus:outline-none font-normal"
            />

            {/* Scan Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#bdf567] hover:bg-[#aeef4b] active:scale-[0.98] disabled:opacity-75 text-[#121808] font-bold text-sm sm:text-base px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-150 flex-shrink-0 ml-2 shadow-sm flex items-center justify-center min-w-[90px]"
            >
              {loading ? 'Scanning...' : 'Scan'}
            </button>
          </form>

          {/* Loading status showing Detected chain */}
          {loading && (
            <div className="mt-3 text-center text-xs font-medium text-[#655887] animate-pulse">
              Detected chain: Robinhood Chain — Scanning onchain metrics...
            </div>
          )}

          {/* Error Output */}
          {error && (
            <div className="mt-4 p-4 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-700 text-sm text-center shadow-sm backdrop-blur-sm font-medium animate-fadeIn">
              {error}
            </div>
          )}

          {/* Minimal Scan Results Card (Rendered below input bar) */}
          {result && (
            <div className="mt-5 w-full bg-[#f8f5fe]/95 backdrop-blur-md border border-white/90 rounded-3xl p-6 shadow-[0_20px_45px_-15px_rgba(120,100,170,0.25)] text-[#2d2545] animate-fadeIn">
              {/* Token Name & Symbol & Confidence */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-200/60">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-[#1a142e] leading-tight">
                      {result.tokenName}
                    </h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getConfidenceBadgeStyle(result.confidence)}`}>
                      {result.confidence} Confidence
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6b5d93]">
                      ${result.tokenSymbol}
                    </span>
                    <span className="text-[11px] text-[#7a6b9f]">
                      • Detected chain: {result.detectedChain}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#786b9e] uppercase tracking-wider font-medium">Failure Score</div>
                  <div className="text-2xl font-black text-[#1a142e] leading-none mt-0.5">
                    {result.failureScore} <span className="text-sm font-normal text-[#6b5d93]">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-3 text-sm">
                {/* Quote-Side Liquidity */}
                <div className="flex items-center justify-between py-1.5 border-b border-purple-100/60">
                  <div className="flex flex-col">
                    <span className="text-[#594d7d] font-medium">Quote-side liquidity</span>
                    {result.liquidity.detail && (
                      <span className="text-[10px] text-[#8477a8] italic">{result.liquidity.detail}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1a142e]">{result.liquidity.value}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getRiskBadgeStyle(result.liquidity.riskLabel)}`}>
                      {result.liquidity.riskLabel}
                    </span>
                  </div>
                </div>

                {/* Holder Concentration */}
                <div className="flex items-center justify-between py-1.5 border-b border-purple-100/60">
                  <span className="text-[#594d7d] font-medium">Holder concentration</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1a142e]">{result.holderConcentration.value}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getRiskBadgeStyle(result.holderConcentration.riskLabel)}`}>
                      {result.holderConcentration.riskLabel}
                    </span>
                  </div>
                </div>

                {/* Dev Wallet Activity */}
                <div className="flex items-center justify-between py-1.5 border-b border-purple-100/60">
                  <span className="text-[#594d7d] font-medium">Dev wallet activity</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1a142e]">{result.devWalletActivity.value}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getRiskBadgeStyle(result.devWalletActivity.riskLabel)}`}>
                      {result.devWalletActivity.riskLabel}
                    </span>
                  </div>
                </div>

                {/* Volume Behavior */}
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#594d7d] font-medium">Volume behavior</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1a142e]">{result.volumeBehavior.value}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getRiskBadgeStyle(result.volumeBehavior.riskLabel)}`}>
                      {result.volumeBehavior.riskLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Non-Financial Advice Disclaimer */}
              <div className="mt-5 pt-3 border-t border-purple-200/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[#6b5d93] font-medium">Overall Status:</span>
                  <span className={`font-bold px-2.5 py-0.5 rounded-full border ${getRiskBadgeStyle(result.riskStatus)}`}>
                    {result.riskStatus}
                  </span>
                </div>
                <div className="text-[#8477a8] text-[11px] italic">
                  Onchain risk estimate — not financial advice.
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Empty Footer space for balance */}
      <footer className="w-full h-4 sm:h-8" />
    </div>
  );
}
