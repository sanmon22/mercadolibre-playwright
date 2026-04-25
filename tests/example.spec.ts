import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://mercadolibre.com.co/');

  await expect(page).toHaveTitle(/mercado libre/i);
});

