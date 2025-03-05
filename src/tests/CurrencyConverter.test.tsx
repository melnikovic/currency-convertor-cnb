import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencyConverter from '../components/CurrencyConverter';

describe('CurrencyConverter', () => {
  const mockCurrencies = [
    {
      country: 'Euro zone',
      currency: 'euro',
      amount: 1,
      code: 'EUR',
      rate: 25.0,
    },
    {
      country: 'United States',
      currency: 'dollar',
      amount: 1,
      code: 'USD',
      rate: 22.5,
    },
  ];

  test('renders correctly', () => {
    render(<CurrencyConverter currencies={mockCurrencies} />);

    expect(screen.getByLabelText(/amount in czk/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/convert to/i)).toBeInTheDocument();
    expect(screen.getByTestId('convert-button')).toBeInTheDocument();
  });

  test('displays error when amount is invalid', () => {
    render(<CurrencyConverter currencies={mockCurrencies} />);

    const currencySelect = screen.getByTestId('currency-select');
    const convertButton = screen.getByTestId('convert-button');

    fireEvent.change(currencySelect, { target: { value: 'EUR' } });
    fireEvent.click(convertButton);

    expect(screen.getByText(/please enter a valid amount/i)).toBeInTheDocument();
  });

  test('displays error when currency is not selected', () => {
    render(<CurrencyConverter currencies={mockCurrencies} />);

    const amountInput = screen.getByTestId('amount-input');
    const convertButton = screen.getByTestId('convert-button');

    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.click(convertButton);

    expect(screen.getByText(/please select a currency/i)).toBeInTheDocument();
  });

  test('calculates conversion correctly', () => {
    render(<CurrencyConverter currencies={mockCurrencies} />);

    const amountInput = screen.getByTestId('amount-input');
    const currencySelect = screen.getByTestId('currency-select');
    const convertButton = screen.getByTestId('convert-button');

    // Set up conversion: 100 CZK to EUR
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(currencySelect, { target: { value: 'EUR' } });
    fireEvent.click(convertButton);

    // Expected: 100 CZK = 4.00 EUR (100 / 25)
    expect(screen.getByTestId('conversion-result')).toHaveTextContent('100.00 CZK = 4.00 EUR');
  });
});
