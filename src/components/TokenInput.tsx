import React, { useState } from 'react';
import { Link2 } from 'lucide-react';

interface TokenInputProps {
  onScan: (address: string) => void;
  isScanning?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({ 
  onScan, 
  isScanning = false 
}) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || isScanning) return;
    onScan(address);
  };

  return (
    <div className="w-full max-w-[580px] sm:max-w-[640px] mx-auto px-4 mt-6">
      <form 
        onSubmit={handleSubmit}
        className="w-full bg-white/95 backdrop-blur-md rounded-full p-2 pl-5 sm:pl-6 flex items-center justify-between gap-3 shadow-input-pill border border-purple-200/50 hover:border-purple-300 transition-all group"
      >
        {/* Link Icon */}
        <Link2 className="w-5 h-5 text-purple-500/70 group-hover:text-purple-700 transition-colors shrink-0" />

        {/* Text Input */}
        <input
          type="text"
          placeholder="Paste token address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isScanning}
          className="w-full bg-transparent text-[#1D103A] font-display text-sm sm:text-base font-medium placeholder:text-purple-300/80 focus:outline-none"
        />

        {/* Lime Green Scan Button */}
        <button
          type="submit"
          disabled={isScanning || !address.trim()}
          className="px-7 sm:px-9 py-2.5 sm:py-3 rounded-full bg-[#BFFF47] hover:bg-[#B3FA37] text-[#0F2600] font-bold font-display text-sm sm:text-base tracking-wide shadow-lime-btn disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all shrink-0 cursor-pointer"
        >
          {isScanning ? 'Scanning...' : 'Scan'}
        </button>
      </form>
    </div>
  );
};
