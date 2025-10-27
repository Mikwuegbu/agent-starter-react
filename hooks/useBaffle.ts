import { useEffect, useRef } from 'react';
import baffle from 'baffle';

interface BaffleOptions {
  characters?: string;
  speed?: number;
  duration?: number;
  delay?: number;
  loop?: boolean;
  loopInterval?: number;
}

export const useBaffle = <T extends HTMLElement = HTMLElement>(options: BaffleOptions = {}) => {
  const elementRef = useRef<T>(null);
  const baffleRef = useRef<any>(null);

  const defaultOptions = {
    characters: '+-•~!=*',
    speed: 75,
    duration: 1000,
    delay: 0,
    loop: false,
    loopInterval: 2000,
    ...options
  };

  useEffect(() => {
    if (elementRef.current) {
      baffleRef.current = baffle(elementRef.current, {
        characters: defaultOptions.characters,
        speed: defaultOptions.speed
      });

      let loopTimer: NodeJS.Timeout;
      
      // Start the effect after delay
      const timer = setTimeout(() => {
        const runBaffle = () => {
          baffleRef.current.start();
          baffleRef.current.reveal(defaultOptions.duration);
          
          // Set up loop if enabled
          if (defaultOptions.loop) {
            loopTimer = setTimeout(runBaffle, defaultOptions.loopInterval);
          }
        };
        
        runBaffle();
      }, defaultOptions.delay);

      return () => {
        clearTimeout(timer);
        clearTimeout(loopTimer);
        if (loopTimerRef.current) {
          clearTimeout(loopTimerRef.current);
        }
        if (baffleRef.current) {
          baffleRef.current.stop();
        }
      };
    }
  }, [defaultOptions.characters, defaultOptions.speed, defaultOptions.duration, defaultOptions.delay, defaultOptions.loop, defaultOptions.loopInterval]);

  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  const trigger = (loop = false) => {
    if (baffleRef.current) {
      // Clear any existing loop
      if (loopTimerRef.current) {
        clearTimeout(loopTimerRef.current);
        loopTimerRef.current = null;
      }
      
      baffleRef.current.start();
      baffleRef.current.reveal(defaultOptions.duration);
      
      // If loop is requested, set up continuous looping
      if (loop) {
        const runBaffle = () => {
          baffleRef.current.start();
          baffleRef.current.reveal(defaultOptions.duration);
          loopTimerRef.current = setTimeout(runBaffle, defaultOptions.loopInterval);
        };
        loopTimerRef.current = setTimeout(runBaffle, defaultOptions.loopInterval);
      }
    }
  };

  const stopLoop = () => {
    if (baffleRef.current) {
      baffleRef.current.stop();
    }
    if (loopTimerRef.current) {
      clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  };

  return { elementRef, trigger, stopLoop };
};