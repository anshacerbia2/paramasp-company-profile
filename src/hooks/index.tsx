"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState<(undefined | number)[]>([
    undefined,
    undefined,
  ]);
  useEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

// const useParentSize = (parentRef) => {
//   const [size, setSize] = useState([0, 0]);
//   useEffect(() => {
//     setSize([parentRef.current?.clientWidth, parentRef.current?.clientHeight]);
//   }, [parentRef.current?.clientWidth])
//   return size;
// }
const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      savedCallback.current?.();
    };

    const start = () => {
      if (intervalId.current) return; // biar ga dobel
      intervalId.current = setInterval(tick, delay);
    };

    const stop = () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };

    // langsung start
    start();

    // handle pause/resume saat tab ganti
    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [delay]);
};

// const useTimeout = (callback, delay) => {
//   const savedCallback = useRef();
//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);
//   // Set up the timeout.
//   useEffect(() => {
//     const tick = () => savedCallback.current();
//     if (delay !== null) {
//       let id = setTimeout(tick, delay);
//       return () => clearTimeout(id);
//     }
//   }, [delay]);
// }

// export { useWindowSize, useParentSize, useInterval, useTimeout };

const useContainerCenter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCenter({
      x: rect.width / 2,
      y: rect.height / 2,
    });
  }, []);

  return { ref, center };
};

export { useWindowSize, useInterval, useContainerCenter };
