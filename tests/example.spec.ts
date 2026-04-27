import { test, expect } from '@playwright/test';

const url = "https://mercadolibre.com.co/" 

test('has title', async ({ page }) => {
  await page.goto(url);

  await expect(page).toHaveTitle(/mercado libre/i);
});

test('test', async ({ page }) => {

	await page.goto(url)
	await page.locator('input[id=\'cb1-edit\']').fill('Iphone');
	await page.keyboard.press('Enter')
	
	await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible()
	// await page.pause();
	
	const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li').allInnerTexts()
	// console.log(titles);
	
	for (const title of titles) {
		console.log(title);
	}
	
});


/*







*/