import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary';

const ProblemChild = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Simulation AST syntax exploded');
  }
  return <div>Clean Simulation Canvas</div>;
};

describe('ErrorBoundary Component', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Clean Simulation Canvas')).toBeInTheDocument();
  });

  it('catches render error, renders fallback UI and error message', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallbackTitle="Custom Engine Error">
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Engine Error')).toBeInTheDocument();
    expect(screen.getByText('Simulation AST syntax exploded')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset view/i })).toBeInTheDocument();

    spy.mockRestore();
  });

  it('triggers onReset callback when Reset View is clicked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onReset = vi.fn();

    render(
      <ErrorBoundary onReset={onReset}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button', { name: /reset view/i }));
    expect(onReset).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });
});
