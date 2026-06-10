import { test, expect } from "@playwright/test";
import { LoginPage } from "./page_object/LoginPage";

test('purchase_flow_old', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

    const randomIndex = Math.floor(Math.random() * itemsContainer?.length)

    const randomItem = itemsContainer[randomIndex]
    // const randomItem1 = itemsContainer[1]
    // const randomItem2 = itemsContainer[2]

    const expectedName = await randomItem.locator('.inventory_item_name').innerText();
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

    // console.log(`Name: ${expectedName}, Description: ${expectedDescription}, Price: ${expectedPrice}`);
    
    await randomItem.getByRole('button', { name: 'Add to cart' }).click();
    // await randomItem1.getByRole('button', { name: 'Add to cart' }).click();
    // await randomItem2.getByRole('button', { name: 'Add to cart' }).click();

    await page.locator('.shopping_cart_link').click();

    expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

    const itemsCartNames = await page.locator('#cart_contents_container .inventory_item_name').all();

    for(const item of itemsCartNames){
        const currentName = await item.innerText();
        expect(expectedName).toEqual(currentName)
    }
        
    await page.locator('[data-test="checkout"]').click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Santiago');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Monrroy');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('221122');
    
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Finish' }).click();

    expect(page.locator('.complete-header')).toBeVisible();

})

test('login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginObject = new LoginPage(page);

    await loginObject.loginWithCredentials('standard_user', 'secret_sauce')

    expect(page.locator('.inventory_list')).toBeVisible();
})

test('add item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const loginObject = new LoginPage(page);

    await loginObject.loginWithCredentials('standard_user', 'secret_sauce')

    await loginObject.selectRandomProduct();

    expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

})