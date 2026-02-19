import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BarChart from '.';
import colours from '../../helpers/colours';

const defaultProps = {
  columns: 3,
  rows: 4,
  colour: colours.orange,
  data: { 'United Kingdom': 100, 'United States': 80, Germany: 60 },
};

describe('BarChart', () => {
  it('renders without crashing', () => {
    render(<BarChart {...defaultProps} />);
  });

  it('renders the title when provided', () => {
    render(<BarChart {...defaultProps} title="Top Countries" />);
    expect(screen.getByText('Top Countries')).toBeInTheDocument();
  });

  it('does not render a title when not provided', () => {
    const { container } = render(<BarChart {...defaultProps} />);
    expect(container.querySelector('h2')).not.toBeInTheDocument();
  });

  it('renders the legend when provided', () => {
    render(<BarChart {...defaultProps} legend="Only anonymous edits" />);
    expect(screen.getByText('Only anonymous edits')).toBeInTheDocument();
  });

  it('does not render a legend when not provided', () => {
    render(<BarChart {...defaultProps} />);
    expect(screen.queryByText('Only anonymous edits')).not.toBeInTheDocument();
  });

  it('renders without crashing with empty data', () => {
    render(<BarChart {...defaultProps} data={{}} />);
  });
});
