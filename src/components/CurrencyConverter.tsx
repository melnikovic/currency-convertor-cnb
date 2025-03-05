import React, { useState, useEffect } from 'react';
import { Currency } from '../types';
import { Form, InputGroup, Label, Input, Select, Button, Result, ErrorMessage } from './styles';

interface CurrencyConverterProps {
  currencies: Currency[];
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ currencies }) => {
  const [amount, setAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConvertedAmount(null);
    setError(null);
  }, [amount, selectedCurrency]);

  const calculateConversion = (amountInCZK: string, currencyCode: string): number | null => {
    if (!amountInCZK || isNaN(Number(amountInCZK)) || !currencyCode) {
      return null;
    }

    const currency = currencies.find((c) => c.code === currencyCode);
    if (!currency) {
      return null;
    }

    const czk = parseFloat(amountInCZK);
    return czk / (currency.rate / currency.amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(Number(amount))) {
      setError('Please enter a valid amount');
      return;
    }

    if (!selectedCurrency) {
      setError('Please select a currency');
      return;
    }

    const result = calculateConversion(amount, selectedCurrency);
    if (result === null) {
      setError('Currency not found');
      return;
    }

    setConvertedAmount(result);
    setError(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    if (selectedCurrency) {
      const result = calculateConversion(e.target.value, selectedCurrency);
      if (result !== null) {
        setConvertedAmount(result);
        setError(null);
      }
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
    if (amount) {
      const result = calculateConversion(amount, e.target.value);
      if (result !== null) {
        setConvertedAmount(result);
        setError(null);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="currency-converter-form">
      <InputGroup>
        <Label htmlFor="amount">Amount in CZK:</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount in CZK"
          data-testid="amount-input"
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="currency">Convert to:</Label>
        <Select id="currency" value={selectedCurrency} onChange={handleCurrencyChange} data-testid="currency-select">
          <option value="">Select currency</option>
          {currencies && currencies.length > 0
            ? currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.currency}
                </option>
              ))
            : null}
        </Select>
      </InputGroup>

      <Button type="submit" data-testid="convert-button">
        Convert
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {convertedAmount !== null && selectedCurrency && (
        <Result data-testid="conversion-result">
          {parseFloat(amount).toFixed(2)} CZK = {convertedAmount.toFixed(2)} {selectedCurrency}
        </Result>
      )}
    </Form>
  );
};

export default CurrencyConverter;
