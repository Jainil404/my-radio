'use client';
import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      
      const formatted = formatter.format(now);
      // Replace colon with a span to enable the CSS blink animation
      return formatted.replace(':', '<span class="animate-blink">:</span>');
    };

    setTime(formatTime());
    const interval = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="text-white/80 font-mono text-sm tracking-widest"
      dangerouslySetInnerHTML={{ __html: time }}
    />
  );
}