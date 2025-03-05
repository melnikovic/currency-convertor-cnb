import { useQuery } from '@tanstack/react-query';
import { Currency } from '../types';
import { parseCurrencyData } from '../utils/parseCurrencyData';

const fetchCurrencyData = async (): Promise<Currency[]> => {
  const response = await fetch('/api/exchange-rates');
  const data = await response.text();
  return parseCurrencyData(data);
};

export const useCurrencyData = () => {
  return useQuery<Currency[], Error>({
    queryKey: ['currencyData'],
    queryFn: fetchCurrencyData,
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};
