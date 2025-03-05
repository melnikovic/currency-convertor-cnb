import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../../App';
import { vi } from 'vitest';

vi.mock('../hooks/useCurrencyData', async () => {
  const actual = await vi.importActual('../hooks/useCurrencyData');
  return {
    ...actual,
    useCurrencyData: () => ({
      data: [
        {
          country: 'EMU',
          currency: 'euro',
          amount: 1,
          code: 'EUR',
          rate: 25.085,
        },
        {
          country: 'USA',
          currency: 'dollar',
          amount: 1,
          code: 'USD',
          rate: 23.44,
        },
        {
          country: 'Hungary',
          currency: 'forint',
          amount: 100,
          code: 'HUF',
          rate: 6.29,
        },
      ],
      isLoading: false,
      error: null,
    }),
  };
});

describe('App', () => {
  test('renders the app with title and components', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Czech National Bank Currency Exchange/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading exchange rates.../i)).toBeInTheDocument();
  });
});
