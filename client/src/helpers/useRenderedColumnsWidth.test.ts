import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useRenderedColumnsWidth from './useRenderedColumnsWidth';
import { contentWidthPxForColumns, minScreenWidthPxForColumns } from './gridSizes';

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe('useRenderedColumnsWidth', () => {
  it('caps at 2 columns on very small screens', () => {
    setWindowWidth(320);
    const { result } = renderHook(() => useRenderedColumnsWidth(6));
    expect(result.current).toBe(contentWidthPxForColumns(2));
  });

  it('uses 4 columns at the 4-column breakpoint', () => {
    setWindowWidth(minScreenWidthPxForColumns(4));
    const { result } = renderHook(() => useRenderedColumnsWidth(6));
    expect(result.current).toBe(contentWidthPxForColumns(4));
  });

  it('uses 6 columns at the 6-column breakpoint', () => {
    setWindowWidth(minScreenWidthPxForColumns(6));
    const { result } = renderHook(() => useRenderedColumnsWidth(6));
    expect(result.current).toBe(contentWidthPxForColumns(6));
  });

  it('uses 8 columns at the 8-column breakpoint', () => {
    setWindowWidth(minScreenWidthPxForColumns(8));
    const { result } = renderHook(() => useRenderedColumnsWidth(8));
    expect(result.current).toBe(contentWidthPxForColumns(8));
  });

  it('uses 12 columns at the 12-column breakpoint', () => {
    setWindowWidth(minScreenWidthPxForColumns(12));
    const { result } = renderHook(() => useRenderedColumnsWidth(12));
    expect(result.current).toBe(contentWidthPxForColumns(12));
  });

  it('caps columns to the requested amount even when the screen is wider', () => {
    setWindowWidth(minScreenWidthPxForColumns(12));
    const { result } = renderHook(() => useRenderedColumnsWidth(4));
    expect(result.current).toBe(contentWidthPxForColumns(4));
  });

  it('updates width when the window is resized', () => {
    setWindowWidth(320);
    const { result } = renderHook(() => useRenderedColumnsWidth(6));
    expect(result.current).toBe(contentWidthPxForColumns(2));

    act(() => {
      setWindowWidth(minScreenWidthPxForColumns(6));
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(contentWidthPxForColumns(6));
  });
});
