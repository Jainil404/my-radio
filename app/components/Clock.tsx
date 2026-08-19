'use client';
import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent server/client text mismatch by not rendering the time until client-side mounted
  if (!isMounted) {
    return <div className="h-6" />; // Empty placeholder matching clock height
  }

  return (
    <div className="text-white text-sm tracking-wider">
      {time}
    </div>
  );
}