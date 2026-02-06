import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  separator?: string;
  suffix?: string;
  className?: string;
  startWhen?: boolean;
  resetKey?: number;
}

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  separator = '',
  suffix = '',
  className = '',
  startWhen = true,
  resetKey = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(from);
  const [hasStarted, setHasStarted] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Reset when resetKey changes
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setCount(from);
    setHasStarted(false);
  }, [resetKey, from]);

  useEffect(() => {
    if (!startWhen || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startWhen, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeoutId = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        
        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(from + (to - from) * easeOut);
        
        setCount(currentCount);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(to);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasStarted, from, to, duration, delay]);

  const formatNumber = (value: number) => {
    return separator
      ? value.toLocaleString('en-US').replace(/,/g, separator)
      : value.toString();
  };

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}{suffix && <span className="suffix">{suffix}</span>}
    </span>
  );
}
