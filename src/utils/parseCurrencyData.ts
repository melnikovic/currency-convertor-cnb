import { Currency } from '../types';

export const parseCurrencyData = (data: string): Currency[] => {
  try {
    const lines = data.trim().split('\n');

    // Skip the first line (date line) and second line (header line)
    if (lines.length < 3) {
      throw new Error('Invalid data format: Not enough lines');
    }

    return lines.slice(2).map((line) => {
      const [country, currency, amount, code, rate] = line.split('|');

      if (!country || !currency || !amount || !code || !rate) {
        throw new Error(`Invalid line format: ${line}`);
      }

      return {
        country: country.trim(),
        currency: currency.trim(),
        amount: parseInt(amount.trim(), 10),
        code: code.trim(),
        rate: parseFloat(rate.trim().replace(',', '.')),
      };
    });
  } catch (error) {
    console.error('Error parsing currency data:', error);
    return [];
  }
};
