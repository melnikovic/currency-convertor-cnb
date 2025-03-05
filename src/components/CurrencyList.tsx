import React from 'react';
import { Currency } from '../types';
import { Table, TableHeader, TableRow, TableCell, LoadingSpinner, ErrorMessage } from './styles';

interface CurrencyListProps {
  currencies: Currency[];
  isLoading: boolean;
  error: Error | null;
}

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies, isLoading, error }) => {
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner /> Loading currency data...
      </div>
    );
  }

  if (error) {
    return <ErrorMessage>Error loading currency data: {error.message}</ErrorMessage>;
  }

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Country</TableHeader>
              <TableHeader>Currency</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Code</TableHeader>
              <TableHeader>Rate (CZK)</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <TableRow key={currency.code}>
                <TableCell>{currency.country}</TableCell>
                <TableCell>{currency.currency}</TableCell>
                <TableCell>{currency.amount}</TableCell>
                <TableCell>{currency.code}</TableCell>
                <TableCell>{currency.rate.toFixed(3)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CurrencyList;
