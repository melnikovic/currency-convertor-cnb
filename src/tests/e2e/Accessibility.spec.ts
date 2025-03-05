import { test, expect } from '@playwright/test';

// Mock data to be used in the tests
const mockExchangeRatesData = `05 Mar 2025 #46
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.123
Euro zone|euro|1|EUR|25.340
United States|dollar|1|USD|22.567
Japan|yen|100|JPY|15.238`;

test.describe('Currency Converter App - Accessibility', () => {
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

  test('form elements have proper labels for screen readers', async ({ page }) => {
    const amountInput = page.getByTestId('amount-input');
    const amountLabel = page.getByText('Amount in CZK:');
    const amountInputId = await amountInput.getAttribute('id');
    const forAttribute = await amountLabel.getAttribute('for');
    expect(forAttribute).toBe(amountInputId);

    const currencySelect = page.getByTestId('currency-select');
    const currencyLabel = page.getByText('Convert to:');
    const currencySelectId = await currencySelect.getAttribute('id');
    const currencyLabelFor = await currencyLabel.getAttribute('for');
    expect(currencyLabelFor).toBe(currencySelectId);
  });

  test('error messages are announced to screen readers', async ({ page }) => {
    await page.getByTestId('convert-button').click();

    const errorMessage = page.getByText('Please enter a valid amount');
    await expect(errorMessage).toBeVisible();
    const hasAccessibilityAssociation = await page.evaluate(() => {
      const errorElement = document.querySelector('[role="alert"]');
      return !!errorElement;
    });

    expect(hasAccessibilityAssociation).toBeTruthy();
  });
});
