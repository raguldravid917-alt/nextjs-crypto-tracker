// src/app/CryptoList.tsx

"use client"; // இதுதான் Next.js-க்கு இது Client Component என்று சொல்லும்!
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
  // யூசர் டைப் செய்யும் வார்த்தையை சேவ் பண்ண State
  const [search, setSearch] = useState('');

  // யூசர் டைப் செய்வதை வைத்து காயின்களை ஃபில்டர் (Filter) செய்கிறோம்
  const filteredCoins = initialCoins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Search Bar டிசைன் */}
      <input
        type="text"
        placeholder="Search coins (e.g., Bitcoin, ETH)..."
        className="w-full p-4 mb-6 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* காயின்கள் லிஸ்ட் */}
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
          <p className="text-center text-gray-400 py-4">No coins found! 😢</p> // தேடும் காயின் இல்லை என்றால் இந்த மெசேஜ் வரும்
        )}
      </div>
    </div>
  );
}