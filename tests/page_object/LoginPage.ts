import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly usernameTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly loginButton: Locator;
    private readonly productList: Locator;

    constructor(page: Page) {
        this.usernameTextBox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextBox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.productList = page.locator('#inventory_container .inventory_item');
    }

    private async fillUsername(username: string) {
        await this.usernameTextBox.fill(username);
    }

    private async fillPassword(password: string) {
        await this.passwordTextBox.fill(password);
    }

    private async clickOnLogin() {
        await this.loginButton.click();
    }

    async loginWithCredentials(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);

        await this.clickOnLogin();
    }

    async selectRandomProduct() {
        const allProducts = await this.productList.all()
        const randomID = Math.floor(Math.random() * allProducts?.length)

        const randomProduct = allProducts[randomID];

        await randomProduct.getByRole('button', { name: 'Add to cart' }).click();
    }

}