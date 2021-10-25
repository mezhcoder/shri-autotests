const { assert } = require('chai');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Корзина', async function() {
    it('Проверка оформления заказа + верстка', async function() {
        //Проверка добавления и очищения элементов
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        let link = await this.browser.$(".card-link");
        await link.waitForExist({ timeout: 1500 })
        link.click();
        await sleep(400);

        let button = await this.browser.$("//button[text()='Add to Cart']");
        button.click();
        await sleep(400);

        let spanSuccessAddItem = await this.browser.$(".text-success");
        let spanSuccessAddItemText = await spanSuccessAddItem.getText();
        assert.equal(spanSuccessAddItemText, 'Item in cart');

        await sleep(600);
        await this.browser.assertView('itemShop-check', '#root');


        await this.browser.url('https://shri.yandex/hw/store/cart');
        await sleep(550);
        let btnClearCart = await this.browser.$("//button[text()='Clear shopping cart']");
        btnClearCart.click();
        await sleep(400);

        let linkCatalog = await this.browser.$("//a[text()='catalog']");
        assert.equal(await linkCatalog.getAttribute('href'), "/hw/store/catalog")

        //Проверка оформления заказа
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        link = await this.browser.$(".card-link");
        await link.waitForExist({ timeout: 1500 })
        link.click();
        await sleep(400);

        button = await this.browser.$("//button[text()='Add to Cart']");
        button.click();
        await sleep(400);

        spanSuccessAddItem = await this.browser.$(".text-success");
        spanSuccessAddItemText = await spanSuccessAddItem.getText();
        assert.equal(spanSuccessAddItemText, 'Item in cart');

        await this.browser.url('https://shri.yandex/hw/store/cart')
        this.browser.refresh();

        let inputName = await this.browser.$('.Form-Field_type_name')
        await sleep(250);
        await inputName.scrollIntoView();
        await inputName.click();
        await inputName.keys(["Nikita"]);

        let inputPhone = await this.browser.$('.Form-Field_type_phone');
        await sleep(250);
        await inputPhone.scrollIntoView();
        await inputPhone.click();
        await inputPhone.keys(["81234567890"]);

        let formAddress = await this.browser.$('.Form-Field_type_address');
        await sleep(250);
        await formAddress.scrollIntoView();
        await this.browser.waitUntil(() => formAddress.isClickable(), 700);
        await formAddress.click();
        await formAddress.keys(["Test address"]);

        await sleep(250);
        const btnCheckout = await this.browser.$('.Form-Submit');
        await btnCheckout.scrollIntoView();

        await sleep(250);
        await btnCheckout.click();

        await sleep(450);
        const alertHeading = await this.browser.$('.alert-heading');
        assert.equal(await alertHeading.getText(), 'Well done!');
    });
});


describe("Проверка вёрстки", async () => {
     it("Desktop версия mainPage", async function() {
        await this.browser.refresh();
        await this.browser.setWindowSize(1024, 3048);
        await this.browser.url('https://shri.yandex/hw/store/');
        await sleep(3000);
        await this.browser.assertView('store-full-click', '#root');
    });

    it("Мобильная вёрстка contacts", async function() {
        await this.browser.refresh();
        await this.browser.setWindowSize(500, 1024);
        await this.browser.url('https://shri.yandex/hw/store/contacts');
        await sleep(1200);
        await this.browser.$('.container').scrollIntoView();
        const button = await this.browser.$('button.Application-Toggler');
        await button.waitForClickable();
        await button.click();
        await sleep(1200);
        await this.browser.assertView('contacts-mini-click', '#root');
    });
});