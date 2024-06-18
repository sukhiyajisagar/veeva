// core-product-tests/cypress/tests/test.spec.js

import HomePage from '../pages/home_page';

describe('Test case 4: for DP2', function () {

    beforeEach(function () {
        // Load fixture file
        cy.fixture('app3/data.json').as('data');
    })

    it('Test case 4: for DP2', function () {
        const home = new HomePage();
        cy.viewport(1280, 720);
        cy.visit(this.data.CP.url, {
            failOnStatusCode: false
        });

        // Define an array to store all footer links
    const allFooterLinks = [];

    // Traverse the DOM to extract footer links from each <nav> element
    cy.get('footer[data-testid="footer"] div:nth-child(2) div nav')
      .each(($nav) => {
        // Extract header text for reference (optional)
        const headerText = $nav.find('h2').text().trim();

        // Extract each link within the current <nav> element
        cy.wrap($nav)
          .find('ul[data-testid="footer-list"] a')
          .each(($link) => {
            // Use invoke to get the href attribute
            cy.wrap($link).invoke('attr', 'href').then((url) => {
              if (url) {
                allFooterLinks.push({ url, section: headerText });
              }
            });
          });
      })
      .then(() => {
        // Extract unique URLs based on href attribute
        const uniqueFooterLinks = allFooterLinks.reduce((acc, curr) => {
          if (!acc.find(link => link.url === curr.url)) {
            acc.push(curr);
          }
          return acc;
        }, []);

        // Report any duplicates
        if (allFooterLinks.length !== uniqueFooterLinks.length) {
          const duplicates = allFooterLinks.filter((item, index) => {
            return allFooterLinks.findIndex(link => link.url === item.url) !== index;
          });
          cy.log(`Found ${duplicates.length} duplicate footer links:`);
          duplicates.forEach((link) => {
            cy.log(`${link.url} (Section: ${link.section})`);
          });
        } else {
          cy.log('No duplicate footer links found.');
        }

        // Output uniqueFooterLinks to CSV (optional)
        cy.writeFile('cypress/fixtures/app3/footer_links.csv', uniqueFooterLinks.map(link => ({ url: link.url, section: link.section })) );
      });
  });
});
