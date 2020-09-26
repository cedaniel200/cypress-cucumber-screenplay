/// <reference types="cypress"/>

const { Before, Given, When, Then } = require("cypress-cucumber-preprocessor/steps");
const homePage = require('../../support/ui/homePage');

Before(() => {
    console.log('EN EL BEFORE');
    cy.visit('/login');
    cy.fixture('user').as('userData');
    cy.fixture('repository').as('repositoryData');
});

Given(`Cesar wants to start versioning`, function() {
    cy.authenticate(this.userData.email, this.userData.rightPassword);
    cy.get(homePage.NEW_REPOSITORY_BUTTON).click();
});

When(`Cesar creates a repository`, function() {
    cy.createRepository(this.repositoryData);
});

Then(`Cesar should see the repository created`, function() {
    cy.url().should('include', this.repositoryData.name);
});