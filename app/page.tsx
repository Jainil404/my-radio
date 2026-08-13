import Clock from './components/Clock';
import Player from './components/Player';
import { playlists } from './data/tracks';

// Define the turbulence SVG purely as a string to avoid React mounting overhead
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

export const viewport = {
  viewportFit: "cover",
};

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* 1. Background Layer */}
      <div className="absolute inset-0 -z-20 hero-bg bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      {/* 2. Grain Overlay */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none opacity-30"
        style={{ 
          backgroundImage: `url("${NOISE_SVG}")`,
          mixBlendMode: 'overlay' 
        }} 
      />

      {/* 3. Top Row */}
      <header className="w-full flex items-start justify-between text-white" style={{ padding: 'max(1rem, env(safe-area-inset-top)) max(1.5rem, env(safe-area-inset-right)) 0 max(1.5rem, env(safe-area-inset-left))' }}>
        <div className="flex flex-col gap-1">
          <Clock />
        </div>
        
        <div className="flex flex-col items-center gap-1 opacity-80">
          <span className="text-[30px] uppercase tracking-widest font-semibold text-accent">Live</span>
          <span className="text-xl tracking-wide"> Mountain's choise </span>
        </div>

        <div className="flex flex-col items-end gap-1.5 mt-1">
          {/* Signal Pill */}
          <div className="border border-white/60 rounded-full px-3 py-1 mb-1 backdrop-blur-sm">
            <span className="text-[9px] uppercase tracking-widest font-medium text-white/90">
              Signal: Weak (H+)
            </span>
          </div>
          
          {/* Environment Details */}
          <span className="text-[9px] uppercase tracking-widest text-white/90">
            Temp: 4°C
          </span>
          <span className="text-[9px] uppercase tracking-widest text-white/70">
            Location: 34.1526° N, 77.5771° E
          </span>
          <span className="text-[9px] uppercase tracking-widest text-white/70">
            "Maggi Point - 1.2KM"
          </span>
        </div>
      </header>

      {/* 4. The Player */}
      <footer className="w-full flex justify-center pb-8 px-4" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <Player playlist={playlists.bollywood} />
      </footer>
    </main>
  );
}