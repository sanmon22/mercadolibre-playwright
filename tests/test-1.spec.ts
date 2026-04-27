import { test, expect } from '@playwright/test';

const url = 'https://www.mercadolibre.com.co/'


test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByPlaceholder('Buscar ').fill('Iphone')
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Apple iPhone 17 (256 GB) - Negro - Distribuidor Autorizado' }).first().click();
  await page.pause()
});

test('validate results', async ({ page }) => {
	const responsePromise = page.waitForResponse(response => response.url().includes('/recommendations') && response.status() === 200)

	await page.goto(url)
	await page.getByPlaceholder('Buscar ').fill('Iphone')


	const response = await responsePromise;
	const body = await response.json();

	console.log(body);
	
	
	
	
})