import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const eventDate = new Date('2024-10-26T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-6 md:gap-10 mb-12">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="bg-black bg-opacity-50 rounded-lg px-4 py-3 min-w-[100px]">
            <div className="text-3xl md:text-4xl font-bold text-[#00B4D8]">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm uppercase tracking-wider text-gray-300 mt-1">
              {key}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;