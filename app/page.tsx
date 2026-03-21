// src/app/page.tsx

import CryptoList from './CryptoList'; // புதுசா உருவாக்குன ஃபைலை உள்ளே கொண்டு வரோம்

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

export default async function Home() {
  
  // 50 காயின்களின் டேட்டாவை சர்வரிலேயே எடுக்குறோம் (Server-Side Fetching)
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false', {
    next: { revalidate: 60 } 
  });
  
  const coins: Coin[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
        Live Crypto Tracker 🚀
      </h1>
      
      {/* நாம் எடுத்த டேட்டாவை Client Component-க்கு Props ஆக அனுப்புகிறோம்! */}
      <CryptoList initialCoins={coins} />
      
    </main>
  );
}