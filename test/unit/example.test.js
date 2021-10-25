/**
 * @jest-environment jsdom
 */

import React from 'react';

import {BrowserRouter} from 'react-router-dom';
import events from '@testing-library/user-event'
import {render, screen} from '@testing-library/react';
import {it, expect} from "@jest/globals"

import { ExampleStore } from '../../src/server/data';
import {Application} from '../../src/client/Application'
import {initStore, productsLoaded} from "../../src/client/store";
import {Provider} from "react-redux";
import {CartApi, ExampleApi} from "../../src/client/api";
import {Catalog} from "../../src/client/pages/Catalog";

describe('Тестирование шапки', function() {
    it('Страница Catalog', function() {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application);
        console.log(container.querySelector(".Home").innerHTML);
        expect(container.querySelector(".Home").innerHTML).toBe('<div class="row"><div class="col bg-secondary text-white py-4 bg-opacity-75"><p class="display-3">Welcome to Example store!</p><p class="lead">Culpa perspiciatis corporis facilis fugit similique</p><p class="lead">Cum aut ut eveniet rem cupiditate natus veritatis quia</p></div></div><div class="row mb-4"><div class="col-12 col-md-4 bg-light py-3"><h1>Quickly</h1><p class="lead">Odio aut assumenda ipsam amet reprehenderit. Perspiciatis qui molestiae qui tempora quisquam</p></div><div class="col-12 col-md-4 bg-light py-3"><h1>Qualitatively</h1><p class="lead">Ut nisi distinctio est non voluptatem. Odio aut assumenda ipsam amet reprehenderit</p></div><div class="col-12 col-md-4 bg-light py-3"><h1>Inexpensive</h1><p class="lead">Perspiciatis qui molestiae qui tempora quisquam. Ut nisi distinctio est non voluptatem</p></div></div><div class="row mb-4"><div class="col-12py-3"><p>Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.</p><p>Modi corporis consectetur aliquid sit cum tenetur enim. Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.</p></div></div>')
    })
    it('Страница Delivery', function() {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application);

        let currentElement;
        for (const element of document.querySelectorAll('.navbar-nav a')) {
            if (element.innerHTML === 'Delivery')
                currentElement = element
        }
        events.click(currentElement);
        expect(container.querySelector(".Delivery").innerHTML).toBe('<div class="row"><div class="col"><h1>Delivery</h1><p>Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedit enim consequuntur amet at consequuntur vero. Dolor et ad facere asperiores iste est praesentium quaerat iure. Quibusdam mollitia autem quos voluptas quia est doloremque corporis et. Sed fuga quasi esse perspiciatis fugit maxime. Qui quidem amet.</p><img class="Image w-25 mb-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII="><p>Dolores magnam consequatur iste aliquam qui sint non ab. Culpa saepe omnis. Recusandae vel aperiam voluptates harum. Perspiciatis qui molestiae qui tempora quisquam. Mollitia voluptatum minus laboriosam. Dolor maiores possimus repudiandae praesentium hic eos. Veritatis et repellat.</p><p>Pariatur nisi nobis hic ut facilis sunt rerum id error. Soluta nihil quisquam quia rerum illo. Ipsam et suscipit est iure incidunt quasi et eum. Culpa libero dignissimos recusandae. In magni sapiente non voluptas molestias. Deserunt quos quo placeat sunt. Ea necessitatibus dolores eaque ex aperiam sunt eius. Saepe aperiam aut. Quaerat natus consequatur aut est id saepe et aut facilis.</p></div></div>');
    })
    it('Страница Contacts', function() {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application);

        let currentElement;
        for (const element of document.querySelectorAll('.navbar-nav a')) {
            if (element.innerHTML === 'Contacts')
                currentElement = element
        }
        events.click(currentElement);
        expect(container.querySelector(".Contacts").innerHTML).toBe('<div class="row"><div class="col"><h1>Contacts</h1><p>Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum aliquid aut optio et ea. Quaerat et eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae aut quos iure. Repellat aperiam ut aliquam iure. Veritatis magnam quisquam et dolorum recusandae aut.</p><p>Molestias inventore illum architecto placeat molestias ipsam facilis ab quo. Rem dolore cum qui est reprehenderit assumenda voluptatem nisi ipsa. Unde libero quidem. Excepturi maiores vel quia. Neque facilis nobis minus veniam id. Eum cum eveniet accusantium molestias voluptas aut totam laborum aut. Ea molestiae ullam et. Quis ea ipsa culpa eligendi ab sit ea error suscipit. Quia ea ut minus distinctio quam eveniet nihil. Aut voluptate numquam ipsa dolorem et quas nemo.</p></div></div>');
    })
    it('Страница Cart', function() {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);

        const application = (
            <BrowserRouter>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application);

        let currentElement;
        for (const element of document.querySelectorAll('.navbar-nav a')) {
            if (element.innerHTML.includes('Cart'))
                currentElement = element
        }
        events.click(currentElement);
        expect(container.querySelector("h1").textContent).toBe("Shopping cart");
    })

})

describe('Общие требования', function() {
    it('Проверка имя заголовка на главную страницу', () => {
        const basename = '/hw/store';
        const api = new ExampleApi(basename);
        const cart = new CartApi();

        const store = initStore(api, cart);
        const application = (
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </BrowserRouter>
        );
        const {container} = render(application);

        const nameHeader = container.querySelector('.Application-Brand');
        expect(nameHeader.getAttribute("href")).toBe("/hw/store/");
    });
})

describe('Каталог', () => {
    it('Отображение данных, которые приходят с сервера',  async () => {
        const exampleStore = new ExampleStore();
        const basename = '/';
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const {container} = render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog/>
                </Provider>
            </BrowserRouter>
        );

        const products = exampleStore.getAllProducts();
        store.dispatch(productsLoaded(products));

        const productItems = container.querySelector(".Catalog div:nth-child(2)");
        expect(productItems.children.length).toBe(products.length);

        for (let i = 0; i < products.length; i++) {
            const currentProduct = products[i];
            let productInPage = productItems.children[i];

            expect(productInPage.querySelector(".card-title").innerHTML).toBe(currentProduct.name);
            expect(productInPage.querySelector(".card-text").innerHTML.replace("$", "")).toBe(currentProduct.price.toString());
        }
    })
});

describe('Test server API /', function() {
    it('execute getProductById() via getAllProducts()', function() {
        const store = new ExampleStore();

        for (let elementProduct of store.getAllProducts()) {
            let product = store.getProductById(elementProduct.id);
            if (elementProduct.id !== product.id) {
                expect(elementProduct.id).toBe(product.id)
            }
            if (elementProduct.name !== product.name) {
                expect(elementProduct.name).toBe(product.name)
            }
            if (elementProduct.price !== product.price) {
                expect(elementProduct.price).toBe(product.price)
            }
        }

    })
})

