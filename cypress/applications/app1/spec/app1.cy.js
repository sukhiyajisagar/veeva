// core-product-tests/cypress/tests/test.spec.js

import HomePage from '../pages/home_page';

describe('Test Case 1: for CP', function () {

    beforeEach(function () {
        // Load fixture file
        cy.fixture('app1/data.json').as('data');
    })

    it('Test Case 1: for CP', function () {
        const home = new HomePage();
        cy.viewport(1280, 720);

        //Open site
        cy.visit(this.data.CP.url, {failOnStatusCode: false});

        //Just to showcase page object model
        //Click on Shop menu
        HomePage.elements.shopMenu().invoke('removeAttr', 'target').click();

        cy.origin('https://shop.warriors.com', () => {
            // Click on 'Men' category
            cy.get('li[role="menuitem"] > a[aria-label="Men"]', { timeout: 10000 }).click();

            //Filter jackets
            cy.get('a[data-trk-id="jackets"]', { timeout: 10000 }).click();

            //Store data in txt file
            cy.get('.product-grid .columns').each(($el, index, $list) => {
                const title = $el.find('img.product-image').attr('alt');
                const price = $el.find('.product-card-pricing .price').text();
                cy.writeFile('cypress/fixtures/app1/jackets.txt', { title, price }, { flag: 'a+' });
            });
        });
    });
});