Feature: Compra en saucedemo
  Como usuario de saucedemo
  Quiero comprar un producto
  Para completar el flujo de checkout

  Scenario: Compra de un producto
    Given Cesar está en saucedemo
    When Cesar inicia sesión como usuario estándar
    And Cesar agrega una mochila al carrito
    And Cesar abre el carrito
    Then Cesar ve un producto en el carrito
    When Cesar completa el checkout con sus datos
    Then Cesar ve la confirmación de la compra
