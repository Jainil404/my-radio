'use client';
import { useEffect, useRef, useState } from 'react';
import { Track } from '../data/tracks';

// Tell TypeScript that YouTube will provide these variables later
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Define sub-components at module scope to prevent React remounting
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
);

// --- NEW: Shuffle Brain! Gets a random track that isn't the current one ---
const getRandomIndex = (currentIndex: number, totalTracks: number) => {
  if (totalTracks <= 1) return currentIndex;
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * totalTracks);
  } while (nextIndex === currentIndex); // Keep rolling until it's a new song
  return nextIndex;
};

export default function Player({ playlist }: { playlist: Track[] }) {
  // Start with a random track right out of the gate!
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * playlist.length));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const playerRef = useRef<any>(null);
  
  // We use a state ref to prevent "stale closures" when YouTube triggers an event
  const stateRef = useRef({ currentIndex, playlist });
  useEffect(() => {
    stateRef.current = { currentIndex, playlist };
  }, [currentIndex, playlist]);

  // Reset to a NEW random track whenever the user switches to a new genre
  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * playlist.length));
  }, [playlist]);

  const track = playlist[currentIndex];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // The Initialization Brain
  useEffect(() => {
    if (playerRef.current) return; 

    const initializePlayer = () => {
      if (playerRef.current) return;
      
      // Check which container is currently visible on the screen
      const isMobile = window.innerWidth < 640;
      const containerId = isMobile ? 'yt-player-container-mobile' : 'yt-player-container';

      playerRef.current = new window.YT.Player(containerId, {
        videoId: stateRef.current.playlist[stateRef.current.currentIndex].videoId,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, fs: 0, rel: 0 },
        events: {
          onReady: (e: any) => {
            setDuration(e.target.getDuration());
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
            if (e.data === window.YT.PlayerState.ENDED) {
              const { currentIndex, playlist } = stateRef.current;
              setCurrentIndex(getRandomIndex(currentIndex, playlist.length));
            }
          },
          onError: (e: any) => {
            console.error("YouTube Player Error - Skipping to random track");
            const { currentIndex, playlist } = stateRef.current;
            setCurrentIndex(getRandomIndex(currentIndex, playlist.length));
          }
        }
      });
    };

    if (!window.YT || !window.YT.Player) {
      if (!document.getElementById('youtube-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
      
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initializePlayer();
      };
    } else {
      initializePlayer();
    }
  }, []);

  // Update YouTube player smoothly when the track changes
  useEffect(() => {
    if (playerRef.current?.loadVideoById && playerRef.current?.cueVideoById) {
      if (isPlaying) {
        playerRef.current.loadVideoById(track.videoId); 
      } else {
        playerRef.current.cueVideoById(track.videoId); 
      }
    }
  }, [track.videoId]); 

  // Progress ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current?.getCurrentTime) {
          setProgress(playerRef.current.getCurrentTime());
          setDuration(playerRef.current.getDuration() || 0);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  // Manual buttons now trigger the Shuffle Brain
  const handleNext = () => setCurrentIndex((prev) => getRandomIndex(prev, playlist.length));
  const handlePrev = () => setCurrentIndex((prev) => getRandomIndex(prev, playlist.length));

  const handleSeek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTo = percent * duration;
    playerRef.current.seekTo(seekTo, true);
    setProgress(seekTo);
  };

  const glassClasses = "border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]";

  return (
    <div className="w-full max-w-xl text-white font-sans">
      
      {/* DESKTOP PLAYER */}
      <div className={`hidden sm:flex items-center rounded-full p-3 pr-5 ${glassClasses}`}>
        <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-black">
          {/* Visible Iframe rendered here */}
          <div 
            id="yt-player-container" 
            className="absolute w-[300%] h-[300%] pointer-events-none" 
            style={{ animation: 'var(--animate-spin-slow)', animationPlayState: isPlaying ? 'running' : 'paused' }}
          />
          <div className="absolute w-3 h-3 bg-black/70 ring-2 ring-white/40 rounded-full z-10" />
        </div>

        <div className="flex-1 flex flex-col justify-center min-w-0 px-4">
          <h2 className="text-[15px] font-semibold truncate">{track.title}</h2>
          <p className="text-[12.5px] text-white/70 truncate">{track.artist}</p>
          
          <div 
            className="h-6 mt-1 flex items-center cursor-pointer touch-none group"
            onPointerDown={handleSeek}
          >
            <div className="w-full h-[3px] bg-white/15 relative rounded-full">
              <div 
                className="absolute top-0 left-0 h-full bg-accent rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                style={{ width: `${(progress / duration) * 100 || 0}%` }}
              />
              <div 
                className="absolute top-1/2 -mt-1.5 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm"
                style={{ left: `calc(${(progress / duration) * 100 || 0}% - 6px)` }}
              />
            </div>
          </div>
          
          <div className="text-[10.5px] tabular-nums text-white/50 mt-0.5">
            {formatTime(progress)} / {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handlePrev} className="p-2 text-white/70 hover:text-white transition-colors">
            <PrevIcon />
          </button>
          <button onClick={togglePlay} className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/20 hover:bg-accent/30 text-accent transition-colors ring-1 ring-accent/50">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button onClick={handleNext} className="p-2 text-white/70 hover:text-white transition-colors">
            <NextIcon />
          </button>
        </div>
      </div>

      {/* MOBILE PLAYER */}
      <div className={`sm:hidden flex flex-col rounded-[26px] p-5 gap-4 ${glassClasses}`}>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-black">
             {/* The mobile player relies on the hidden desktop iframe for sound, but still visually spins! */}
             <div 
              className="absolute w-[300%] h-[300%] pointer-events-none bg-zinc-900" 
              style={{ animation: 'var(--animate-spin-slow)', animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
            <div className="absolute w-2.5 h-2.5 bg-black/70 ring-2 ring-white/40 rounded-full z-10" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[16px] font-semibold truncate">{track.title}</h2>
            <p className="text-[13px] text-white/70 truncate">{track.artist}</p>
          </div>
        </div>

        <div 
          className="h-8 flex items-center cursor-pointer touch-none"
          onPointerDown={handleSeek}
        >
          <div className="w-full h-1 bg-white/15 relative rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-accent rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"
              style={{ width: `${(progress / duration) * 100 || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[11px] tabular-nums text-white/50">
            {formatTime(progress)} / {formatTime(duration)}
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={handlePrev} className="p-3 text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
              <PrevIcon />
            </button>
            <button onClick={togglePlay} className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-gradient-to-b from-accent to-orange-600 text-white shadow-[0_4px_12px_rgba(249,115,22,0.4)] ring-1 ring-white/25">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={handleNext} className="p-3 text-white/70 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
              <NextIcon />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}