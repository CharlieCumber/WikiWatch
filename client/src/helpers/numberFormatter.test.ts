import { describe, it, expect } from 'vitest';
import numberFormatter from './numberFormatter';

describe('numberFormatter', () => {
  it('returns "0" for zero', () => {
    expect(numberFormatter(0, 0)).toBe('0');
  });

  describe('values below 1000', () => {
    it('formats without a suffix', () => {
      expect(numberFormatter(1, 0)).toBe('1');
      expect(numberFormatter(500, 0)).toBe('500');
      expect(numberFormatter(999, 0)).toBe('999');
    });
  });

  describe('values from 1000', () => {
    it('formats with k suffix', () => {
      expect(numberFormatter(1000, 0)).toBe('1k');
      expect(numberFormatter(2000, 0)).toBe('2k');
    });

    it('includes decimal when digits allow', () => {
      expect(numberFormatter(1500, 1)).toBe('1.5k');
      expect(numberFormatter(1100, 1)).toBe('1.1k');
    });

    it('strips trailing zeros from decimal', () => {
      expect(numberFormatter(1000, 2)).toBe('1k');
      expect(numberFormatter(1100, 2)).toBe('1.1k');
    });
  });

  describe('values from 1 million', () => {
    it('formats with M suffix', () => {
      expect(numberFormatter(1000000, 0)).toBe('1M');
      expect(numberFormatter(2000000, 0)).toBe('2M');
    });

    it('includes decimal when digits allow', () => {
      expect(numberFormatter(2500000, 1)).toBe('2.5M');
    });

    it('strips trailing zeros from decimal', () => {
      expect(numberFormatter(1500000, 2)).toBe('1.5M');
    });
  });
});
