import { test, expect } from '@playwright/test';

const mockExchangeRatesData = `05 Mar 2025 #46
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
Euro zone|euro|1|EUR|25.340
United States|dollar|1|USD|22.567`;

test.describe('Currency Converter App - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/api/exchange-rates', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: mockExchangeRatesData,
      });
    });

    await page.goto('/');
  });

  test('should have responsive layout on mobile devices', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Czech National Bank Currency Exchange' })).toBeVisible();

    const form = page.getByTestId('currency-converter-form');
    await expect(form).toBeVisible();

    const formBoundingBox = await form.boundingBox();
    const viewportSize = page.viewportSize();

    expect(formBoundingBox!.width).toBeLessThanOrEqual(viewportSize!.width);
  });

  test('should be able to scroll to see all currencies on mobile', async ({ page }) => {
    const table = page.locator('table');
    await expect(table).toBeVisible();
    await expect(page.getByText('Australia')).toBeVisible();

    await page.getByText('United States').scrollIntoViewIfNeeded();

    await expect(page.getByText('United States')).toBeVisible();
  });

  test('should be able to use the converter on mobile', async ({ page }) => {
    await page.getByTestId('amount-input').fill('500');
    await page.getByTestId('currency-select').selectOption('USD');
    await page.getByTestId('convert-button').click();

    await expect(page.getByTestId('conversion-result')).toBeVisible();
    await expect(page.getByTestId('conversion-result')).toContainText('500.00 CZK = 22.16 USD');
  });

  test('form inputs should have appropriate sizes on mobile', async ({ page }) => {
    const amountInput = page.getByTestId('amount-input');
    const currencySelect = page.getByTestId('currency-select');

    await expect(amountInput).toBeVisible();
    await expect(currencySelect).toBeVisible();

    const amountBoundingBox = await amountInput.boundingBox();
    const selectBoundingBox = await currencySelect.boundingBox();
    const viewportSize = page.viewportSize();

    expect(amountBoundingBox!.width).toBeLessThanOrEqual(viewportSize!.width - 20); // Allow for padding
    expect(selectBoundingBox!.width).toBeLessThanOrEqual(viewportSize!.width - 20); // Allow for padding
  });
});
