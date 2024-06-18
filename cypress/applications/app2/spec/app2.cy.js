// core-product-tests/cypress/tests/test.spec.js

import HomePage from '../pages/home_page';

describe('Test case 3: for DP1', function () {

    beforeEach(function () {
        // Load fixture file
        cy.fixture('app2/data.json').as('data');
    })

    it('Test case 3: for DP1', function () {
        const home = new HomePage();
        cy.viewport(1280, 720);
        cy.visit(this.data.CP.url, {
            failOnStatusCode: false
        });

        // Get all slide buttons within the tablist
        cy.get('[role="tablist"] .TileHeroStories_tileHeroStoriesButton__ERoIz').each(($button, index) => {
            // Wait for the button to become visible
            cy.wrap($button).should('be.visible');

            // Check if the button is selected (aria-selected is true)
            cy.wrap($button).should('have.attr', 'aria-selected', 'true');

            // Measure the start time of the slide display
            const startTime = new Date();

            // Wait for the button to become unselected (aria-selected changes to false)
            cy.wrap($button).should('have.attr', 'aria-selected', 'false').then(() => {
                // Measure the end time of the slide display
                const endTime = new Date();

                // Calculate the actual duration in milliseconds
                const actualDuration = endTime - startTime;

                // Log the actual duration (optional)
                cy.log(`Slide ${index + 1} duration: ${actualDuration} milliseconds`);

                // Validate the duration against expected value (adjust as needed)
                const expectedDuration = 10000; // Assuming each slide is displayed for 10 seconds
                const tolerance = 1000; // Tolerance in milliseconds

                expect(actualDuration).to.be.closeTo(expectedDuration, tolerance);
            });
        });

        const expectedTexts = [
            'Tyrese Maxey Wins 2023-24 NBA Sportsmanship Award',
            'Sixers 2023-24 Season Memorable Moments',
            'Watch Daryl Morey 23-24 Season End Press Conference',
            'Tyrese Maxey Named 2023-24 Kia NBA Most Improved Player'
        ];

        // Get each button under the tablist div and perform assertions on its headers
        cy.get('div[role="tablist"] > button').each(($btn, index) => {
            cy.wrap($btn).within(() => {
                cy.get('div:first-child')
                    .should('be.visible')
                    .and('have.text', expectedTexts[index]);
            });
        });

        cy.get('button[role="tab"] > div:first-child').then(($elements) => {
            const elementCount = $elements.length;

            // Assert the count matches the expected value
            const expectedElementCount = 4; // Replace with your expected count
            expect(elementCount).to.equal(expectedElementCount);
        });
    });
});