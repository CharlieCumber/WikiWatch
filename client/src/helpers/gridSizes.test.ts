import { describe, it, expect } from 'vitest';
import {
  columnWidth,
  gutterWidthPx,
  gutterWidth,
  minScreenWidthPxForColumns,
  minScreenWidthForColumns,
  contentWidthPxForColumns,
  contentWidthForColumns,
  contentHeightPxForRows,
  contentHeightForRows,
} from './gridSizes';

describe('gridSizes', () => {
  describe('constants', () => {
    it('exports column width as pixel string', () => {
      expect(columnWidth).toBe('150px');
    });

    it('exports gutter width in pixels', () => {
      expect(gutterWidthPx).toBe(10);
    });

    it('exports gutter width as pixel string', () => {
      expect(gutterWidth).toBe('10px');
    });
  });

  describe('minScreenWidthPxForColumns', () => {
    it('calculates minimum screen width for 2 columns', () => {
      expect(minScreenWidthPxForColumns(2)).toBe(330);
    });

    it('calculates minimum screen width for 4 columns', () => {
      expect(minScreenWidthPxForColumns(4)).toBe(650);
    });

    it('calculates minimum screen width for 6 columns', () => {
      expect(minScreenWidthPxForColumns(6)).toBe(970);
    });

    it('calculates minimum screen width for 8 columns', () => {
      expect(minScreenWidthPxForColumns(8)).toBe(1290);
    });

    it('calculates minimum screen width for 10 columns', () => {
      expect(minScreenWidthPxForColumns(10)).toBe(1610);
    });

    it('calculates minimum screen width for 12 columns', () => {
      expect(minScreenWidthPxForColumns(12)).toBe(1930);
    });
  });

  describe('minScreenWidthForColumns', () => {
    it('returns pixel string', () => {
      expect(minScreenWidthForColumns(4)).toBe('650px');
    });
  });

  describe('contentWidthPxForColumns', () => {
    it('calculates content width for 1 column', () => {
      expect(contentWidthPxForColumns(1)).toBe(150);
    });

    it('calculates content width for 2 columns', () => {
      expect(contentWidthPxForColumns(2)).toBe(310);
    });

    it('calculates content width for 4 columns', () => {
      expect(contentWidthPxForColumns(4)).toBe(630);
    });

    it('calculates content width for 6 columns', () => {
      expect(contentWidthPxForColumns(6)).toBe(950);
    });
  });

  describe('contentWidthForColumns', () => {
    it('returns pixel string', () => {
      expect(contentWidthForColumns(2)).toBe('310px');
    });
  });

  describe('contentHeightPxForRows', () => {
    it('calculates content height for 1 row', () => {
      expect(contentHeightPxForRows(1)).toBe(150);
    });

    it('calculates content height for 2 rows', () => {
      expect(contentHeightPxForRows(2)).toBe(310);
    });

    it('calculates content height for 4 rows', () => {
      expect(contentHeightPxForRows(4)).toBe(630);
    });
  });

  describe('contentHeightForRows', () => {
    it('returns pixel string', () => {
      expect(contentHeightForRows(2)).toBe('310px');
    });
  });
});
