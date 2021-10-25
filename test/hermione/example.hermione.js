const { assert } = require('chai');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Корзина', async function() {
    it('Проверка добавления и очищения элементов', async function() {
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        let link = await this.browser.$(".card-link");
        await link.waitForExist({ timeout: 2000 })
        link.click();
        await sleep(500);

        const button = await this.browser.$("//button[text()='Add to Cart']");
        button.click();
        await sleep(500);

        const spanSuccessAddItem = await this.browser.$(".text-success");
        const spanSuccessAddItemText = await spanSuccessAddItem.getText();
        assert.equal(spanSuccessAddItemText, 'Item in cart');

        await this.browser.url('https://shri.yandex/hw/store/cart');
        await sleep(750);
        const btnClearCart = await this.browser.$("//button[text()='Clear shopping cart']");
        btnClearCart.click();
        await sleep(500);

        const linkCatalog = await this.browser.$("//a[text()='catalog']");
        assert.equal(await linkCatalog.getAttribute('href'), "/hw/store/catalog")
    });
    it('Проверка оформления заказа', async function() {
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        let link = await this.browser.$(".card-link");
        await link.waitForExist({ timeout: 2000 })
        link.click();
        await sleep(500);

        const button = await this.browser.$("//button[text()='Add to Cart']");
        button.click();
        await sleep(500);

        const spanSuccessAddItem = await this.browser.$(".text-success");
        const spanSuccessAddItemText = await spanSuccessAddItem.getText();
        assert.equal(spanSuccessAddItemText, 'Item in cart');

        await this.browser.url('https://shri.yandex/hw/store/cart')
        let inputName = await this.browser.$('.Form-Field_type_name')
        await sleep(300);
        await inputName.scrollIntoView();
        await inputName.click();
        await inputName.keys(["Nikita"]);

        let inputPhone = await this.browser.$('.Form-Field_type_phone');
        await sleep(300);
        await inputPhone.scrollIntoView();
        await inputPhone.click();
        await inputPhone.keys(["81234567890"]);

        let formAddress = await this.browser.$('.Form-Field_type_address');
        await sleep(300);
        await formAddress.scrollIntoView();
        await this.browser.waitUntil(() => formAddress.isClickable(), 700);
        await formAddress.click();
        await formAddress.keys(["Test address"]);

        await sleep(300);
        const btnCheckout = await this.browser.$('.Form-Submit');
        await btnCheckout.scrollIntoView();
        await sleep(300);
        await btnCheckout.click();

        await sleep(500);
        const alertHeading = await this.browser.$('.alert-heading');
        assert.equal(await alertHeading.getText(), 'Well done!');
    });
});


describe("Проверка вёрстки", async () => {
    it("Мобильные контакты", async function() {
        await this.browser.setWindowSize(500, 1024);
        await this.browser.url('https://shri.yandex/hw/store/contacts');
        await(2000);
        await this.browser.assertView('contacts-mini', '#root');
    });

    it("Мобильные контакты (клик)", async function() {
        await this.browser.setWindowSize(500, 1024);
        await this.browser.url('https://shri.yandex/hw/store/contacts');
        await(2000);
        await this.browser.$('.container').scrollIntoView();
        const button = await this.browser.$('button.Application-Toggler');
        await button.waitForClickable();
        await button.click();
        await(2000);
        await this.browser.$('.container').scrollIntoView();
        await(2000);
        await this.browser.assertView('contacts-mini-click', '#root', {
            ignoreElements: ['.navbar-nav a:last-child'],
        });
    });
});