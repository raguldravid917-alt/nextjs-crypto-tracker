"use client";
import { useState, useEffect } from 'react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

interface MetalRates {
  gold: number;
  silver: number;
}

export default function CryptoList({ initialCoins, initialMetals }: { initialCoins: Coin[], initialMetals: MetalRates }) {

  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCoins = initialCoins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

        <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/30 group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl transition-all duration-500 group-hover:bg-yellow-500/30"></div>
          <div className="relative z-10 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🥇</span>
              <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">Gold (24K)</p>
            </div>
            <h3 suppressHydrationWarning className="text-4xl font-extrabold text-white tracking-tight">
              ₹{mounted && initialMetals.gold ? initialMetals.gold.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : "---"}
              <span className="text-sm font-normal text-gray-500 ml-1">/ 1g</span>
            </h3>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-gray-400/30 group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-400/10 rounded-full blur-3xl transition-all duration-500 group-hover:bg-gray-400/20"></div>
          <div className="relative z-10 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🥈</span>
              <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">Silver</p>
            </div>
            <h3 suppressHydrationWarning className="text-4xl font-extrabold text-white tracking-tight">
              ₹{mounted && initialMetals.silver ? initialMetals.silver.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : "---"}
              <span className="text-sm font-normal text-gray-500 ml-1">/ 1g</span>
            </h3>
          </div>
        </div>

      </div>

      <div className="relative mb-10 group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-6 h-6 text-gray-400 group-focus-within:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
          type="text"
          placeholder="Search for Bitcoin, Ethereum..."
          className="w-full p-5 pl-12 rounded-2xl bg-[#111827]/80 backdrop-blur-sm text-white border border-gray-700/50 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all text-lg shadow-inner placeholder-gray-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <div 
              key={coin.id} 
              className="flex justify-between items-center p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer group"
            >
              <div className="flex items-center gap-5">
                <div className="relative w-12 h-12">
                  <img src={coin.image} alt={coin.name} className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-wide text-gray-100 group-hover:text-white">{coin.name}</h2>
                  <div className="mt-1 flex items-center">
                    <span className="px-2 py-0.5 bg-gray-800 rounded text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                      {coin.symbol}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <p suppressHydrationWarning className="text-xl font-bold tracking-wide text-white">
                  ${mounted ? coin.current_price.toLocaleString('en-US') : coin.current_price}
                </p>
                <div className={`mt-1 px-2 py-0.5 rounded flex items-center gap-1 text-sm font-semibold ${coin.price_change_percentage_24h > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                  {coin.price_change_percentage_24h > 0 ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  )}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/[0.02] border border-white/5 rounded-2xl">
            <span className="text-4xl mb-4 block">👻</span>
            <p className="text-xl text-gray-400 font-medium">No assets found...</p>
          </div>
        )}
      </div>
      
    </div>
  );
}