import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BooleanPieChart from '.';
import colours from '../../helpers/colours';

const defaultProps = {
  title: 'Edits by user status',
  data: { yes: 300, no: 1200 },
  trueLabel: 'Anonymous',
  falseLabel: 'Authenticated',
  trueColour: colours.black,
  falseColour: colours.primary,
};

describe('BooleanPieChart', () => {
  it('renders the title', () => {
    render(<BooleanPieChart {...defaultProps} />);
    expect(screen.getByText('Edits by user status')).toBeInTheDocument();
  });

  it('renders without crashing when legend is not provided', () => {
    render(<BooleanPieChart {...defaultProps} />);
    expect(screen.queryByText(/legend/i)).not.toBeInTheDocument();
  });

  it('renders the legend when provided', () => {
    render(<BooleanPieChart {...defaultProps} legend="Some extra context" />);
    expect(screen.getByText('Some extra context')).toBeInTheDocument();
  });

  it('renders without crashing when data values are missing', () => {
    render(<BooleanPieChart {...defaultProps} data={{}} />);
    expect(screen.getByText('Edits by user status')).toBeInTheDocument();
  });

  it('renders without crashing when only yes is provided', () => {
    render(<BooleanPieChart {...defaultProps} data={{ yes: 100 }} />);
    expect(screen.getByText('Edits by user status')).toBeInTheDocument();
  });

  it('renders without crashing when only no is provided', () => {
    render(<BooleanPieChart {...defaultProps} data={{ no: 200 }} />);
    expect(screen.getByText('Edits by user status')).toBeInTheDocument();
  });
});
