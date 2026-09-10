import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, ShieldAlert, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { HERO_SCORE_PREVIEW } from '../data/mockFailedTokens';

export const AppPage: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractAddress.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen space-bg text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10 w-full">
        
        {/* Back Link */}
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landing
          </Link>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>V1 ALPHA PREVIEW</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl text-emerald-400 drop-shadow-[0_0_20px_rgba(0,255,102,0.5)]">
            FAILED SCANNER
          </h1>

          <p className="text-slate-300 font-display text-base sm:text-lg max-w-xl mx-auto">
            Analyze any Solana, Base, or Ethereum token contract for onchain failure risk before trading.
          </p>
        </div>

        {/* Contract Scanner Input Card */}
        <div className="glass-card-green rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-[0_0_50px_rgba(0,255,102,0.15)]">
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Paste token contract address (e.g. 0x... or Sol address)"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            
            <button
              type="submit"
              disabled={isScanning || !contractAddress.trim()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold font-display text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,102,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <span>Scan Risk</span>
              )}
            </button>
          </form>

          {/* Quick presets */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <span>Demo contracts:</span>
            <button 
              onClick={() => setContractAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-emerald-400 transition-colors"
            >
              $MOONCAT (SOL)
            </button>
            <button 
              onClick={() => setContractAddress('0x4d224452801ACEd8B2F0aebE98B5484699D88991')}
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 hover:text-emerald-400 transition-colors"
            >
              $DOGEAI (BASE)
            </button>
          </div>
        </div>

        {/* Demo Scan Result Display */}
        {(hasScanned || contractAddress) && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 animate-float">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono">
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                  <span>SCANNER TELEMETRY RESULT</span>
                </div>

                <h3 className="text-xl font-bold font-display text-white">
                  Contract Analysis Completed
                </h3>
                <p className="text-sm text-slate-300 max-w-md font-mono">
                  Address: {contractAddress || '0x...'}
                </p>
                <p className="text-xs text-purple-300/80">
                  Signals evaluated: Liquidity depth, Holder Gini coefficient, Dev transaction history.
                </p>
              </div>

              {/* Score result badge */}
              <div className="flex flex-col items-center p-6 rounded-2xl bg-black/60 border border-emerald-500/40 shadow-[0_0_30px_rgba(0,255,102,0.2)]">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                  FAILURE SCORE
                </span>
                <span className="font-pixel text-5xl text-emerald-400 shadow-[0_0_15px_rgba(0,255,102,0.5)]">
                  {HERO_SCORE_PREVIEW.score}
                </span>
                <span className="mt-2 text-xs font-mono text-purple-300 bg-purple-950 px-3 py-1 rounded-full border border-purple-500/40">
                  {HERO_SCORE_PREVIEW.verdict}
                </span>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
