import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest';
import formatDateTime from './formatDateTime';

describe('formatDateTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-19T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns only the time for a timestamp from today', () => {
    expect(formatDateTime('2026-02-19T14:30:45.000Z')).toBe('14:30:45');
  });

  it('treats start of today as today', () => {
    expect(formatDateTime('2026-02-19T00:00:00.000Z')).toBe('00:00:00');
  });

  it('returns "Yesterday" prefix for a timestamp from yesterday', () => {
    expect(formatDateTime('2026-02-18T09:00:00.000Z')).toBe('Yesterday 09:00:00');
  });

  it('treats start of yesterday as yesterday', () => {
    expect(formatDateTime('2026-02-18T00:00:00.000Z')).toBe('Yesterday 00:00:00');
  });

  it('returns full date and time for older timestamps', () => {
    expect(formatDateTime('2026-01-15T20:15:30.000Z')).toBe('15 Jan 2026 20:15:30');
  });

  it('handles timestamps from a different year', () => {
    expect(formatDateTime('2025-12-25T10:30:00.000Z')).toBe('25 Dec 2025 10:30:00');
  });
});
