const HomePage = {
    elements: {
        shopMenu: () =>  cy.get('li.menu-item:nth-child(4) > a', { timeout: 10000 })
    }
};
export default HomePage;