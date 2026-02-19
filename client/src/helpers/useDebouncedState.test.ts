import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebouncedState from './useDebouncedState';

describe('useDebouncedState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the initial value', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));
    expect(result.current[0]).toBe('initial');
  });

  it('updates state immediately on the first call', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
  });

  it('debounces rapid successive updates', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));

    act(() => {
      result.current[1]('first');
    });

    act(() => {
      result.current[1]('second');
    });

    expect(result.current[0]).toBe('first');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe('second');
  });

  it('applies the most recent pending value after the delay', () => {
    const { result } = renderHook(() => useDebouncedState(0, 500));

    act(() => {
      result.current[1](1);
    });

    act(() => {
      result.current[1](2);
      result.current[1](3);
      result.current[1](4);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBe(4);
  });

  it('works with object values', () => {
    const { result } = renderHook(() => useDebouncedState<{ count: number } | null>(null, 500));

    act(() => {
      result.current[1]({ count: 42 });
    });

    expect(result.current[0]).toEqual({ count: 42 });
  });

  it('cleans up pending timers on unmount', () => {
    const { result, unmount } = renderHook(() => useDebouncedState('initial', 1000));

    act(() => {
      result.current[1]('first');
    });

    act(() => {
      result.current[1]('pending');
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
  });
});
