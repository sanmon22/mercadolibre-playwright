import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly usernameTextBox: Locator;
    private readonly passwordTextBox: Locator;

    private readonly firstNameTextBox: Locator;
    private readonly lastNameTextBox: Locator;
    private readonly zipCodeTextBox: Locator;

    private readonly loginButton: Locator;
    private readonly cartButton: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly backToHomeButton: Locator;

    private readonly productList: Locator;

    constructor(page: Page) {
        this.usernameTextBox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextBox = page.getByRole('textbox', { name: 'Password' });
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });
        this.zipCodeTextBox = page.getByRole('textbox', { name: 'Zip/Postal Code' });

        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.backToHomeButton = page.locator('[data-test="back-to-products"]');

        this.productList = page.locator('#inventory_container .inventory_item');
    }

    private async clickOnLogin() {
        await this.loginButton.click();
    }

    async clickOnCart() {
        await this.cartButton.click();
    }

    async clickOnCheckout() {
        await this.checkoutButton.click();
    }

    async clickOnContinue() {
        await this.continueButton.click();
    }

    async clickOnFinish() {
        await this.finishButton.click();
    }

    async clickOnBackToHomeButton() {
        await this.backToHomeButton.click();
    }

    async loginWithCredentials(username: string, password: string) {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);

        await this.clickOnLogin();
    }

    async selectRandomProduct() {
        const allProducts = await this.productList.all()
        const randomID = Math.floor(Math.random() * allProducts?.length)

        const randomProduct = allProducts[randomID];

        await randomProduct.getByRole('button', { name: 'Add to cart' }).click();
    }

    async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameTextBox.fill(firstName);
        await this.lastNameTextBox.fill(lastName);
        await this.zipCodeTextBox.fill(zipCode);
    }

}