import CryptoList from './CryptoList';

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

export default async function Home() {
  
  const cryptoRes = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false', {
    next: { revalidate: 60 } 
  });
  const coins: Coin[] = await cryptoRes.json();

  let metals: MetalRates = { gold: 0, silver: 0 };
  try {
    const metalRes = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=82795b650564e4ffdcaef9335fd43334&base=USD&currencies=INR,XAU,XAG', {
      cache: 'no-store' 
    });
    
    if (metalRes.ok) {
      const metalData = await metalRes.json();
      const rates = metalData.rates;
      
      if (rates && rates.XAU && rates.INR) {
        metals = {
  gold: (rates.INR / rates.XAU) / 31.1035,
  silver: (rates.INR / rates.XAG) / 31.1035
};
      }
    } else {
      console.log("API Blocked our request:", await metalRes.text());
    }
  } catch (error) {
    console.error("Failed to fetch metals data", error);
  }

  return (
    <main className="min-h-screen bg-[#0B0C10] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1F2833] via-[#0B0C10] to-black text-white p-6 md:p-12 font-sans selection:bg-yellow-500/30">
      <div className="max-w-4xl mx-auto">
               <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Wealth </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-600 drop-shadow-sm">
              Tracker
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-medium tracking-wide">Live Crypto Assets & Precious Metals</p>
        </div>
        
        <CryptoList initialCoins={coins} initialMetals={metals} />
        
      </div>
    </main>
  );
}