"use client";
import { useState } from 'react';

// TypeScript Rules
interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

export default function CryptoList({ initialCoins }: { initialCoins: Coin[] }) {

  const [search, setSearch] = useState('');

  const filteredCoins = initialCoins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      
      <input
        type="text"
        placeholder="Search coins (e.g., Bitcoin, ETH)..."
        className="w-full p-4 mb-6 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <div key={coin.id} className="flex justify-between items-center border-b border-gray-700 py-4 hover:bg-gray-750 px-4 rounded">
              <div className="flex items-center gap-4">
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                <div>
                  <h2 className="text-xl font-bold">{coin.name}</h2>
                  <p className="text-gray-400 uppercase text-sm">{coin.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${coin.current_price.toLocaleString()}</p>
                <p className={coin.price_change_percentage_24h > 0 ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                  {coin.price_change_percentage_24h > 0 ? "▲" : "▼"} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">No coins found! 😢</p>
        )}
      </div>
    </div>
  );
}