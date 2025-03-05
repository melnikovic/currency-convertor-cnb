import { parseCurrencyData } from '../utils/parseCurrencyData';

describe('parseCurrencyData', () => {
  test('should parse valid currency data correctly', () => {
    const mockData = `05 Mar 2025 #46
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
Canada|dollar|1|CAD|16.789
Euro zone|euro|1|EUR|25.340`;

    const expected = [
      {
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 15.123,
      },
      {
        country: 'Canada',
        currency: 'dollar',
        amount: 1,
        code: 'CAD',
        rate: 16.789,
      },
      {
        country: 'Euro zone',
        currency: 'euro',
        amount: 1,
        code: 'EUR',
        rate: 25.34,
      },
    ];

    expect(parseCurrencyData(mockData)).toEqual(expected);
  });

  test('should handle commas in rate values', () => {
    const mockData = `05 Mar 2025 #46
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15,123`;

    const expected = [
      {
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 15.123,
      },
    ];

    expect(parseCurrencyData(mockData)).toEqual(expected);
  });

  test('should return empty array for invalid data', () => {
    const mockData = `Invalid Data Format`;
    expect(parseCurrencyData(mockData)).toEqual([]);
  });

  test('should handle amounts greater than 1', () => {
    const mockData = `05 Mar 2025 #46
Country|Currency|Amount|Code|Rate
Hungary|forint|100|HUF|6.357`;

    const expected = [
      {
        country: 'Hungary',
        currency: 'forint',
        amount: 100,
        code: 'HUF',
        rate: 6.357,
      },
    ];

    expect(parseCurrencyData(mockData)).toEqual(expected);
  });
});
