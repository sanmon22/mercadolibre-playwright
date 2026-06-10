import { test, expect } from '@playwright/test';

const url = 'https://www.mercadolibre.com.co/'
const user = process.env.MERCADOLIBRE_USER

test('login', async ({ page }) => {
  await page.goto(url);
  await page.locator('[data-link-id="login"]').click()
  const emailForm = await page.locator("#login_user_form input[type='email']");
  emailForm.fill('cardaxtutoriales@gmail.com');
  emailForm.press('Enter');
  await page.pause();

  // no pude continuar con las pruebas en la pag de mercadolibre porque 
  // me solicita mucho recaptcha, necesitamos cambiar el enfoque...
  
});

test('search_product', async ({ page }) => {
  await page.goto(url);
  
  const searchBar = await page.locator('#cb1-edit');
  searchBar.fill('tv samsung');
  searchBar.press('Enter');
  
  const results = await page.locator('.ui-search-layout');
  expect(results).toBeVisible

  console.log(results);
  await page.pause()
  
  



  
  
  
  
  
  
  
  
  
  
  
  
  
  // await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  // await page.getByPlaceholder('Buscar ').fill('Iphone')
  // await page.getByRole('button', { name: 'Buscar' }).click();
  // await page.getByRole('link', { name: 'Apple iPhone 17 (256 GB) - Negro - Distribuidor Autorizado' }).first().click();
  // await page.pause()
});

