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

// Clean icons matching your layout
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-0.5">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);

const PrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
  </svg>
);

const QueueIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 6h11v2H3V6zm0 5h11v2H3v-2zm0 5h7v2H3v-2z" />
    <circle cx="17.5" cy="16.5" r="3" />
    <path d="M18.5 5H22v2h-2v9.5h-1.5V5z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z" />
  </svg>
);

// Tiny "now playing" indicator shown on the active tracklist row
const NowPlayingBars = ({ animated }: { animated: boolean }) => (
  <span className="flex h-3 items-end justify-end gap-[2px]" aria-hidden="true">
    {[
      { h: '60%', delay: '0ms' },
      { h: '100%', delay: '150ms' },
      { h: '45%', delay: '300ms' },
    ].map((bar) => (
      <span
        key={bar.delay}
        className={`w-[3px] rounded-full bg-accent ${animated ? 'animate-pulse' : ''}`}
        style={{ height: animated ? bar.h : '35%', animationDelay: bar.delay }}
      />
    ))}
  </span>
);

// Shuffle Brain
const getRandomIndex = (currentIndex: number, totalTracks: number) => {
  if (totalTracks <= 1) return currentIndex;
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * totalTracks);
  } while (nextIndex === currentIndex);
  return nextIndex;
};

export default function Player({ playlist }: { playlist: Track[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
  setCurrentIndex(Math.floor(Math.random() * playlist.length));
}, [playlist]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  
  const playerRef = useRef<any>(null);
  const queueListRef = useRef<HTMLUListElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  
  const stateRef = useRef({ currentIndex, playlist });
  useEffect(() => {
    stateRef.current = { currentIndex, playlist };
  }, [currentIndex, playlist]);

  useEffect(() => {
    setCurrentIndex(Math.floor(Math.random() * playlist.length));
  }, [playlist]);

  const track = playlist[currentIndex];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Initialization Brain targeting both desktop and mobile containers safely
  useEffect(() => {
    if (playerRef.current) return; 

    const initializePlayer = () => {
      if (playerRef.current) return;
      
      const isMobileScreen = window.innerWidth < 768;
      const containerId = isMobileScreen ? 'yt-player-container-mobile' : 'yt-player-container';

      playerRef.current = new window.YT.Player(containerId, {
        videoId: stateRef.current.playlist[stateRef.current.currentIndex].videoId,
        playerVars: { playsinline: 1, controls: 0, disablekb: 1, fs: 0, rel: 0 , origin: window.location.origin },
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
            console.error("YouTube Player Error - Skipping track");
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

  useEffect(() => {
    if (playerRef.current?.loadVideoById && playerRef.current?.cueVideoById) {
      if (isPlaying) {
        playerRef.current.loadVideoById(track.videoId); 
      } else {
        playerRef.current.cueVideoById(track.videoId); 
      }
    }
  }, [track.videoId]); 

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

  const handleNext = () => setCurrentIndex((prev) => getRandomIndex(prev, playlist.length));
  const handlePrev = () => setCurrentIndex((prev) => getRandomIndex(prev, playlist.length));

  // Tracklist: jump straight to a chosen song and collapse the sheet
  const handleSelectTrack = (index: number) => {
    setCurrentIndex(index);
    setIsQueueOpen(false);
  };

  const toggleQueue = () => {
    const next = !isQueueOpen;
    setIsQueueOpen(next);
    if (next) {
      // Center the active row once the sheet is visible
      requestAnimationFrame(() => {
        const list = queueListRef.current;
        const item = activeItemRef.current;
        if (!list || !item) return;
        list.scrollTop = item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2;
      });
    }
  };

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
    <div className="relative w-full max-w-xl text-white font-sans">

      {/* TRACKLIST BOTTOM SHEET (shared by desktop + mobile, floats above the player card) */}
      <div
        role="dialog"
        aria-label="Tracklist"
        inert={!isQueueOpen}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsQueueOpen(false);
        }}
        className={`absolute bottom-full left-0 right-0 mb-3 flex flex-col overflow-hidden rounded-[28px] ${glassClasses} transition-all duration-300 ease-out motion-reduce:transition-none ${
          isQueueOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between px-5 pt-4 pb-2">
          <div className="min-w-0">
            <p className="text-[10.5px] uppercase tracking-[0.2em] text-white/50">Tracklist</p>
            <h3 className="text-[15px] font-semibold">{playlist.length} tracks</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsQueueOpen(false)}
            aria-label="Close tracklist"
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <ul
          ref={queueListRef}
          className="relative flex max-h-[42vh] flex-col gap-0.5 overflow-y-auto px-2 pb-2"
        >
          {playlist.map((t, i) => {
            const isActive = i === currentIndex;
            return (
              <li key={`${t.id}-${i}`} ref={isActive ? activeItemRef : undefined}>
                <button
                  type="button"
                  onClick={() => handleSelectTrack(i)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                    isActive ? 'bg-white/10 text-accent' : 'text-white hover:bg-white/[0.07]'
                  }`}
                >
                  <span className="w-6 shrink-0 text-right text-[11px] tabular-nums text-white/40">
                    {isActive ? <NowPlayingBars animated={isPlaying} /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium">{t.title}</span>
                    <span className={`block truncate text-[12px] ${isActive ? 'text-accent/70' : 'text-white/60'}`}>
                      {t.artist}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* DESKTOP PLAYER */}
      <div className={`hidden md:flex items-center rounded-full p-3 pr-5 ${glassClasses}`}>
        <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-black">
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
          <button
            type="button"
            onClick={toggleQueue}
            aria-label="Toggle tracklist"
            aria-expanded={isQueueOpen}
            className={`p-2 transition-colors ${isQueueOpen ? 'text-accent' : 'text-white/70 hover:text-white'}`}
          >
            <QueueIcon />
          </button>
        </div>
      </div>

      {/* MOBILE PLAYER (Forced layout matching your Inspect view screenshot) */}
      <div className={`md:hidden flex flex-col rounded-[28px] p-1 gap-0.4 ${glassClasses}`}>
        <div className="flex items-center gap-4">
          <div className="relative w-13 h-13 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-black">
             <div 
              id="yt-player-container-mobile"
              className="absolute w-[300%] h-[300%] pointer-events-none" 
              style={{ animation: 'var(--animate-spin-slow)', animationPlayState: isPlaying ? 'running' : 'paused' }}
            />
            <div className="absolute w-2.5 h-2.5 bg-black/70 ring-2 ring-white/40 rounded-full z-10" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[17px] font-bold truncate">{track.title}</h2>
            <p className="text-[13.5px] text-white/70 truncate">{track.artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          className="h-6 flex items-center cursor-pointer touch-none group px-3"
          onPointerDown={handleSeek}
        >
          <div className="w-full h-1.5 bg-white/20 relative rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-accent rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"
              style={{ width: `${(progress / duration) * 100 || 0}%` }}
            />
          </div>
        </div>

        {/* Timestamps & Spotify-Style Center Play Controls */}
        <div className="flex items-center justify-between text-[12px] tabular-nums text-white/60 px-3">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-3 pb-1">
          <div aria-hidden="true" />
          <div className="flex items-center justify-center gap-8">
            <button onClick={handlePrev} className="p-2 text-white/80 hover:text-white transition-colors">
              <PrevIcon />
            </button>
            <button onClick={togglePlay} className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-b from-accent to-orange-600 text-white shadow-[0_6px_20px_rgba(249,115,22,0.5)] ring-2 ring-white/30 transform active:scale-95 transition-all">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={handleNext} className="p-2 text-white/80 hover:text-white transition-colors">
              <NextIcon />
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleQueue}
              aria-label="Toggle tracklist"
              aria-expanded={isQueueOpen}
              className={`p-2 transition-colors ${isQueueOpen ? 'text-accent' : 'text-white/80 hover:text-white'}`}
            >
              <QueueIcon />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
