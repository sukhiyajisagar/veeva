const {defineConfig} = require('cypress');
// import {defineConfig} from 'cypress';


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/**/*.cy.js',
  },
  fixturesFolder: 'cypress/fixtures',
  reporter:"mochawesome",
  reporterOptions:{
    reportDir:"cypress/report",
    overwrite:false,
    html:false,
    json:true
  }
});
