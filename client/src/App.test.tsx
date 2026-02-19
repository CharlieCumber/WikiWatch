import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import { WikiStatistics } from './helpers/statistics';

const mockStats: WikiStatistics = {
  firstEdit: '2026-02-19T10:00:00.000Z',
  lastEdit: '2026-02-19T11:59:00.000Z',
  editCount: 1500,
  uniqueUsers: 800,
  topCountries: { 'United Kingdom': 100 },
  topCities: {},
  anonymous: { yes: 300, no: 1200 },
  bots: { yes: 50, no: 1450 },
  minorEdits: { yes: 400, no: 1100 },
  newPageEdits: { yes: 200, no: 1300 },
  unreviewedEdits: { yes: 600, no: 900 },
  changeDelta: [],
};

const socketListeners = vi.hoisted(() => ({} as Record<string, Function>));
const mockSocket = vi.hoisted(() => ({
  on: vi.fn((event: string, cb: Function) => { socketListeners[event] = cb; }),
  removeAllListeners: vi.fn(),
}));

vi.mock('socket.io-client', () => ({
  default: vi.fn(() => mockSocket),
}));

vi.mock('./components/BarChart', () => ({
  default: () => <div data-testid="bar-chart" />,
}));

vi.mock('./components/BooleanPieChart', () => ({
  default: () => <div data-testid="pie-chart" />,
}));

vi.mock('./components/ChangeDeltaTimeline', () => ({
  default: () => <div data-testid="timeline" />,
}));

describe('App', () => {
  beforeEach(() => {
    Object.keys(socketListeners).forEach(key => delete socketListeners[key]);
    mockSocket.on.mockClear();
    mockSocket.removeAllListeners.mockClear();
  });

  it('shows connecting message when not connected', () => {
    render(<App />);
    expect(screen.getByText(/attempting to create connection/i)).toBeInTheDocument();
  });

  it('still shows connecting message when connected but no stats received yet', () => {
    render(<App />);

    act(() => {
      socketListeners['connect']?.();
    });

    expect(screen.getByText(/attempting to create connection/i)).toBeInTheDocument();
  });

  it('shows the dashboard when connected and stats are received', () => {
    render(<App />);

    act(() => {
      socketListeners['connect']?.();
      socketListeners['stats']?.({ data: mockStats });
    });

    expect(screen.getByText('WikiWatch | Edit Observer')).toBeInTheDocument();
    expect(screen.queryByText(/attempting to create connection/i)).not.toBeInTheDocument();
  });

  it('shows the edit count and unique user stats', () => {
    render(<App />);

    act(() => {
      socketListeners['connect']?.();
      socketListeners['stats']?.({ data: mockStats });
    });

    expect(screen.getByText('1.5k')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();
  });

  it('shows connecting message after disconnection', () => {
    render(<App />);

    act(() => {
      socketListeners['connect']?.();
      socketListeners['stats']?.({ data: mockStats });
    });

    act(() => {
      socketListeners['disconnect']?.();
    });

    expect(screen.getByText(/attempting to create connection/i)).toBeInTheDocument();
  });

  it('renders bar charts only when country and city data are present', () => {
    render(<App />);

    act(() => {
      socketListeners['connect']?.();
      socketListeners['stats']?.({ data: mockStats });
    });

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('does not render bar charts when country and city data are absent', () => {
    const statsWithoutGeoData: WikiStatistics = {
      ...mockStats,
      topCountries: {},
      topCities: {},
    };

    render(<App />);

    act(() => {
      socketListeners['connect']?.();
      socketListeners['stats']?.({ data: statsWithoutGeoData });
    });

    expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument();
  });
});
