require('cypress-mochawesome-reporter/cucumberSupport')
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')
const loginPage = require('../ui/loginPage')
const inventoryPage = require('../ui/inventoryPage')
const cartPage = require('../ui/cartPage')
const checkoutPage = require('../ui/checkoutPage')

Given('Cesar está en saucedemo', () => {
  cy.visit('/')
})

When('Cesar inicia sesión como usuario estándar', () => {
  cy.fixture('users').then(({ standard }) => {
    cy.authenticate(standard.username, standard.password)
  })
})

When('Cesar inicia sesión como usuario bloqueado', () => {
  cy.fixture('users').then(({ locked }) => {
    cy.authenticate(locked.username, locked.password)
  })
})

Then('Cesar ve el inventario', () => {
  cy.seeVisible(inventoryPage.INVENTORY_LIST)
})

Then('Cesar ve el mensaje de usuario bloqueado', () => {
  cy.seeText(loginPage.ERROR, 'Sorry, this user has been locked out.')
})

When('Cesar agrega una mochila al carrito', () => {
  cy.addProductToCart('sauce-labs-backpack')
})

When('Cesar abre el carrito', () => {
  cy.clickOn(inventoryPage.CART_LINK)
})

Then('Cesar ve un producto en el carrito', () => {
  cy.get(cartPage.CART_ITEM).should('have.length', 1)
})

When('Cesar completa el checkout con sus datos', () => {
  cy.fixture('customer').then((customer) => {
    cy.completeCheckout(customer)
  })
})

Then('Cesar ve la confirmación de la compra', () => {
  cy.seeText(checkoutPage.COMPLETE_HEADER, 'Thank you for your order!')
})
