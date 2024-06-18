// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const fs = require('fs-extra');
const path = require('path');

// Define paths
const reportDir = path.join(__dirname, 'cypress', 'reports');
const txtFilePath = path.join(__dirname, 'cypress', 'fixtures', 'app1', 'jackets.txt');
const destinationPath = path.join(reportDir, 'jackets.txt');

// Copy jackets.txt to report directory
fs.copyFileSync(txtFilePath, destinationPath);

console.log('jackets.txt copied to report directory.');
