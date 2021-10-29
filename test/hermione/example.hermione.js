const { assert } = require('chai');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Корзина', async function() {
    it('Проверка оформления заказа + верстка', async function() {
        //Проверка добавления и очищения элементов + проверка общей стоимости
        //добавляем первый элемент

        await this.browser.url('https://shri.yandex/hw/store/catalog');
        await sleep(200);
        let linkDetails = await this.browser.$('.card-link');
        await linkDetails.click();

        let btnAddCard = await this.browser.$('.ProductDetails-AddToCart');
        await sleep(200);
        await btnAddCard.click();

        let elementPrice = await this.browser.$('.ProductDetails-Price');
        await sleep(200);
        let price = await elementPrice.getText();
        price = price.toString().replace("$", "");
        await this.browser.assertView('item-check', '#root');

        //добавляем второй элемент в корзину
        await this.browser.url('https://shri.yandex/hw/store/catalog');
        linkDetails = await this.browser.$('.row:nth-child(2) div~div .card-link');
        await sleep(200);
        await linkDetails.click();
        btnAddCard = await this.browser.$('.ProductDetails-AddToCart');
        await sleep(200);
        await btnAddCard.click();

        let elementPrice2 = await this.browser.$('.ProductDetails-Price');
        let price2 = await elementPrice2.getText();
        price2 = price2.toString().replace("$", "");

        //Проверяем в корзине совпадает ли сумма предметов
        await this.browser.url('https://shri.yandex/hw/store/cart');
        await sleep(200);
        let sumPriceElement = await this.browser.$('.Cart-OrderPrice');
        let sumPrice = await sumPriceElement.getText();
        sumPrice = sumPrice.toString().replace("$", "");

        price = Number.parseInt(price, 10);
        price2 = Number.parseInt(price2, 10);
        sumPrice = Number.parseInt(sumPrice, 10);
        assert.equal((price + price2), sumPrice);
        await sleep(250);
        let btnClearCart = await this.browser.$("//button[text()='Clear shopping cart']");
        btnClearCart.click();
        await sleep(250);

        let linkCatalog = await this.browser.$("//a[text()='catalog']");
        assert.equal(await linkCatalog.getAttribute('href'), "/hw/store/catalog")

        //Проверка оформления заказа
        await this.browser.url('https://shri.yandex/hw/store/catalog');

        let link = await this.browser.$(".card-link");
        await link.waitForExist({ timeout: 600 })
        link.click();
        await sleep(200);

        let button = await this.browser.$("//button[text()='Add to Cart']");
        button.click();
        await sleep(200);

        let spanSuccessAddItem = await this.browser.$(".text-success");
        let spanSuccessAddItemText = await spanSuccessAddItem.getText();
        assert.equal(spanSuccessAddItemText, 'Item in cart');

        await this.browser.url('https://shri.yandex/hw/store/cart')
        this.browser.refresh();

        let inputName = await this.browser.$('.Form-Field_type_name')
        await sleep(200);
        await inputName.scrollIntoView();
        await inputName.click();
        await inputName.keys(["Nikita"]);

        let inputPhone = await this.browser.$('.Form-Field_type_phone');
        await sleep(200);
        await inputPhone.scrollIntoView();
        await inputPhone.click();
        await inputPhone.keys(["81234567890"]);

        let formAddress = await this.browser.$('.Form-Field_type_address');
        await sleep(200);
        await formAddress.scrollIntoView();
        await this.browser.waitUntil(() => formAddress.isClickable(), 600);
        await formAddress.click();
        await formAddress.keys(["Test address"]);

        await sleep(200);
        const btnCheckout = await this.browser.$('.Form-Submit');
        await btnCheckout.scrollIntoView();

        await sleep(200);
        await btnCheckout.click();

        await sleep(250);
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

    it('Корзина', async function() {
        await this.browser.url('https://shri.yandex/hw/store/cart');
        await sleep(100);
        await this.browser.$('.col').scrollIntoView();
        await this.browser.assertView('cart-default', '.col');
    })
    it('Мобильная корзина', async function() {
        await this.browser.setWindowSize(500, 1024);
        await this.browser.url('https://shri.yandex/hw/store/cart');
        await sleep(100);
        await this.browser.$('.col').scrollIntoView();
        await this.browser.assertView('cart-mini-default', '.col');
    })

});