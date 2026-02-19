import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChangeDeltaTimeline from '.';

const mockData = [
  { label: '14:00', timestamp: 1000000, charactersChangedThisMinute: 500, totalCharactersChanged: 500 },
  { label: '14:01', timestamp: 1000060, charactersChangedThisMinute: 300, totalCharactersChanged: 800 },
  { label: '14:02', timestamp: 1000120, charactersChangedThisMinute: 700, totalCharactersChanged: 1500 },
];

describe('ChangeDeltaTimeline', () => {
  it('renders the title', () => {
    render(<ChangeDeltaTimeline data={mockData} />);
    expect(screen.getByText('Recent Changes (last 20 minutes)')).toBeInTheDocument();
  });

  it('renders the legend describing the data points', () => {
    render(<ChangeDeltaTimeline data={mockData} />);
    expect(screen.getByText(/Up to 20 data points are shown/)).toBeInTheDocument();
  });

  it('renders without crashing with empty data', () => {
    render(<ChangeDeltaTimeline data={[]} />);
    expect(screen.getByText('Recent Changes (last 20 minutes)')).toBeInTheDocument();
  });

  it('renders without crashing with a single data point', () => {
    render(<ChangeDeltaTimeline data={[mockData[0]]} />);
    expect(screen.getByText('Recent Changes (last 20 minutes)')).toBeInTheDocument();
  });
});
