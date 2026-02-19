import { useEffect, useRef, useState } from 'react';

const useDebouncedState = <T>(initialValue: T, delayMs: number): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(initialValue);
  const lastUpdateTime = useRef<number>(0);
  const pendingValue = useRef<{ value: T } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current !== undefined) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const setValue = (value: T) => {
    const elapsed = Date.now() - lastUpdateTime.current;
    if (elapsed >= delayMs) {
      setState(value);
      lastUpdateTime.current = Date.now();
    } else {
      pendingValue.current = { value };
      if (timer.current === undefined) {
        timer.current = setTimeout(() => {
          if (pendingValue.current !== null) {
            setState(pendingValue.current.value);
            lastUpdateTime.current = Date.now();
            pendingValue.current = null;
          }
          timer.current = undefined;
        }, delayMs - elapsed);
      }
    }
  };

  return [state, setValue];
};

export default useDebouncedState;
