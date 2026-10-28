Feature: Compra en saucedemo
  Como usuario de saucedemo
  Quiero comprar un producto
  Para completar el flujo de checkout

  Background:
    Given Cesar está en saucedemo
    And Cesar inicia sesión como usuario estándar
    And Cesar agrega una mochila al carrito

  Scenario: Ver el producto en el carrito
    When Cesar abre el carrito
    Then Cesar ve un producto en el carrito

  Scenario: Completar el checkout
    Given Cesar abre el carrito
    When Cesar completa el checkout con sus datos
    Then Cesar ve la confirmación de la compra
