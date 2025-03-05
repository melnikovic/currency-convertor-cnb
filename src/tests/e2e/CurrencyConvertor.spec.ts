import { test, expect } from '@playwright/test';

// Mock data to be used in the tests
const mockExchangeRatesData = `05 Mar 2025 #46
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
Canada|dollar|1|CAD|16.789
Euro zone|euro|1|EUR|25.340
United States|dollar|1|USD|22.567
Japan|yen|100|JPY|15.238
Hungary|forint|100|HUF|6.357`;

test.describe('Currency Converter App', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/api/exchange-rates', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: mockExchangeRatesData,
      });
    });

    // Navigate to the application
    await page.goto('/');
  });

  test('should display the title and main components', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Czech National Bank Currency Exchange' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Currency Converter' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Current Exchange Rates' })).toBeVisible();
  });

  test('should display all currencies in the table', async ({ page }) => {
    await page.waitForSelector('table');

    await expect(page.getByText('Australia')).toBeVisible();
    await expect(page.getByText('Canada')).toBeVisible();
    await expect(page.getByText('Euro zone')).toBeVisible();
    await expect(page.getByText('United States')).toBeVisible();
    await expect(page.getByText('Japan')).toBeVisible();
    await expect(page.getByText('Hungary')).toBeVisible();

    await expect(page.getByRole('cell', { name: 'AUD' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '15.123' })).toBeVisible();
  });

  test('should convert CZK to EUR correctly', async ({ page }) => {
    await page.getByTestId('amount-input').fill('1000');
    await page.getByTestId('currency-select').selectOption('EUR');
    await page.getByTestId('convert-button').click();

    await expect(page.getByTestId('conversion-result')).toContainText('1000.00 CZK = 39.46 EUR');
  });

  test('should convert CZK to USD correctly', async ({ page }) => {
    await page.getByTestId('amount-input').fill('500');
    await page.getByTestId('currency-select').selectOption('USD');
    await page.getByTestId('convert-button').click();

    await expect(page.getByTestId('conversion-result')).toContainText('500.00 CZK = 22.16 USD');
  });

  test('should show error for invalid amount', async ({ page }) => {
    await page.getByTestId('amount-input').fill('');
    await page.getByTestId('currency-select').selectOption('EUR');
    await page.getByTestId('convert-button').click();

    await expect(page.getByText('Please enter a valid amount')).toBeVisible();
  });

  test('should show error when currency is not selected', async ({ page }) => {
    await page.getByTestId('amount-input').fill('1000');
    await page.getByTestId('convert-button').click();

    await expect(page.getByText('Please select a currency')).toBeVisible();
  });

  test('should update conversion result when changing amount', async ({ page }) => {
    await page.getByTestId('amount-input').fill('100');
    await page.getByTestId('currency-select').selectOption('EUR');
    await page.getByTestId('convert-button').click();

    await expect(page.getByTestId('conversion-result')).toContainText('100.00 CZK = 3.95 EUR');

    await page.getByTestId('amount-input').fill('200');
    await page.getByTestId('convert-button').click();

    await page.waitForFunction(() => {
      const resultElement = document.querySelector('[data-testid="conversion-result"]');
      return resultElement && resultElement.textContent && resultElement.textContent.includes('200.00 CZK');
    });

    await expect(page.getByTestId('conversion-result')).toContainText('200.00 CZK = 7.89 EUR');
  });

  test('should update conversion result when changing currency', async ({ page }) => {
    await page.getByTestId('amount-input').fill('100');
    await page.getByTestId('currency-select').selectOption('EUR');
    await page.getByTestId('convert-button').click();

    await expect(page.getByTestId('conversion-result')).toContainText('100.00 CZK = 3.95 EUR');

    await page.getByTestId('currency-select').selectOption('USD');
    await page.getByTestId('convert-button').click();
    await page.waitForFunction(() => {
      const resultElement = document.querySelector('[data-testid="conversion-result"]');
      return resultElement && resultElement.textContent?.includes('USD');
    });

    await expect(page.getByTestId('conversion-result')).toContainText('100.00 CZK = 4.43 USD');
  });
});
