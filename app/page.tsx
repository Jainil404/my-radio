'use client';

import { useState } from 'react';
import Clock from './components/Clock';
import Player from './components/Player';
import { playlists, genreDetails } from './data/tracks';

// Define the turbulence SVG purely as a string
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

export default function Home() {
  // 1. The "Memory" of the app
  const [currentGenre, setCurrentGenre] = useState('bollywood');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Load the current vibe and playlist based on the selected genre
  const vibe = genreDetails[currentGenre];
  const currentPlaylist = playlists[currentGenre];

  return (
   <main 
      className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url('${vibe.bgDesktop}')` }}
    >
      {/* --- NEW VIDEO BACKGROUND LAYER --- */}
      {vibe.bgVideo && (
        <video
          key={vibe.bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-20 opacity-90 transition-opacity duration-1000"
        >
          <source src={vibe.bgVideo} type="video/mp4" />
        </video>
      )}

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 -z-10 transition-opacity duration-1000" />

      {/* --- SLIDE OUT MENU OVERLAY --- */}
      {/* 1. The dark background that fades in when menu opens */}
      {isMenuOpen && (
        <div 
          className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMenuOpen(false)} // Clicking anywhere outside closes the menu
        />
      )}

      {/* 2. The actual sliding menu box */}
      <div 
        className={`absolute top-0 left-0 h-full w-72 bg-black/90 z-50 border-r border-white/10 transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs">Frequencies</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-white/50 hover:text-white transition-colors text-xl">✕</button>
          </div>
          
          {/* Menu Genre Buttons */}
          <div className="flex flex-col gap-6">
            {Object.keys(genreDetails).map((genreKey) => (
              <button 
                key={genreKey}
                onClick={() => {
                  setCurrentGenre(genreKey); // Change the genre!
                  setIsMenuOpen(false);      // Close the menu!
                }}
                className={`text-left uppercase tracking-[0.15em] text-sm transition-all duration-300 ${currentGenre === genreKey ? 'text-white font-bold translate-x-2' : 'text-white/40 hover:text-white/80 hover:translate-x-1'}`}
              >
                {genreDetails[genreKey].title}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* --- END SLIDE OUT MENU --- */}


      {/* Top Row */}
      <header className="w-full flex items-start justify-between text-white z-30" style={{ padding: 'max(1.5rem, env(safe-area-inset-top)) max(2rem, env(safe-area-inset-right)) 0 max(2rem, env(safe-area-inset-left))' }}>
        
        <div className="flex flex-col gap-4">
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col gap-1.5 w-7 hover:opacity-70 transition-all duration-300 cursor-pointer"
          >
            <span className="h-[2px] w-full bg-white rounded-full"></span>
            <span className="h-[2px] w-full bg-white rounded-full"></span>
            <span className="h-[2px] w-2/3 bg-white rounded-full"></span>
          </button>
          <Clock />
        </div>
        
        {/* TOP CENTER "LIVE" TEXT (Your Blue Square!) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[max(1.5rem,env(safe-area-inset-top))] flex flex-col items-center opacity-90 text-center drop-shadow-md pointer-events-none">
          <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-accent">Live</span>
        </div>

        {/* HUD Details */}
        <div className="flex flex-col items-end gap-1.5 mt-1 drop-shadow-md">
          <div className="border border-white/40 rounded-full px-3 py-1 mb-1 backdrop-blur-md bg-black/20 transition-all duration-500">
            <span className="text-[14px] uppercase tracking-widest font-semibold text-white/95">
              {vibe.hudSignal}
            </span> 
          </div>
          <span className="text-[12px] uppercase tracking-widest text-white/90 transition-all duration-500">
            Temp: {vibe.hudTemp}
          </span>
          <span className="text-[12px] uppercase tracking-widest text-white/75 transition-all duration-500">
            Location: {vibe.hudLocation}
          </span>
          <span className="text-[12px] uppercase tracking-widest text-white/75 transition-all duration-500">
            {vibe.hudLocationName}
          </span>
        </div>
      </header>
        
      {/* Massive Center Title Area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 drop-shadow-2xl w-full px-4 text-center">
        {/* Flawlessly Centered Main Title */}
        <span 
          className="transition-all duration-700 w-full -mt-40 text-white" 
          style={{ 
            fontFamily: 
              currentGenre === 'bollywood' ? 'var(--font-pacifico)' : 
              currentGenre === 'desiHipHop' ? 'var(--font-amsterdam)' : 
              'var(--font-BebasNote-Bold)',
            fontSize: 'clamp(50px, 10vw, 130px)', 
            lineHeight: '1.2',
            fontWeight: 'normal',
            textShadow: '0 10px 40px rgb(253, 250, 250)' 
          }}
        >
          {vibe.title}
        </span>
      </div>

      {/* The Player (Adding 'key' forces the player to fully reset when the genre changes) */}
      <footer className="w-full flex justify-center pb-8 px-4 z-30" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <Player key={currentGenre} playlist={currentPlaylist} />
      </footer>
    </main>
  );
}