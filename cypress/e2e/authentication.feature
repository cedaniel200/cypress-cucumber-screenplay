Feature: Autenticación en saucedemo
  Como usuario de saucedemo
  Quiero iniciar sesión
  Para acceder al inventario

  Scenario: Inicio de sesión válido
    Given Cesar está en saucedemo
    When Cesar inicia sesión como usuario estándar
    Then Cesar ve el inventario

  Scenario: Usuario bloqueado
    Given Cesar está en saucedemo
    When Cesar inicia sesión como usuario bloqueado
    Then Cesar ve el mensaje de usuario bloqueado
