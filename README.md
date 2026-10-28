# Cypress + Cucumber + Screenplay — Demo Saucedemo

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Cypress](https://img.shields.io/badge/Cypress-16.2.0-green)
![Cucumber](https://img.shields.io/badge/Cucumber-28.0.1-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-22%20%7C%2024%20%7C%2026-brightgreen)
![Screenplay](https://img.shields.io/badge/Screenplay-pattern-blue)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Login y compra completa contra [saucedemo.com](https://www.saucedemo.com) con Cypress, Cucumber y
el patrón Screenplay. Los escenarios se escriben en Gherkin y los pasos delegan en tareas e
interacciones.

## Qué incluye

- **3 escenarios** en dos features: login válido, usuario bloqueado y compra completa.
- **Cucumber con `@badeball/cypress-cucumber-preprocessor`** y esbuild.
- **Screenplay en Cypress**: `tasks` para el negocio, `interactions` para la interfaz,
  `questions` para las validaciones y `ui` para los selectores.
- **Informe HTML** con `cypress-mochawesome-reporter` y soporte de Cucumber.
- **Datos de prueba** en fixtures: usuarios y datos del checkout.
- **Sin credenciales locales**: saucedemo publica sus usuarios de demo.

## Requisitos

- **Node.js 22, 24 o 26** (los que soporta Cypress 16).
- **npm**.
- **Acceso a internet**: los escenarios visitan saucedemo.com.

## Cómo se ejecuta

```sh
npm install
npm test
```

Para abrir el runner interactivo:

```sh
npm run cy:open
```

Cypress muestra el resultado en consola y genera el informe HTML al terminar. Las capturas de los
escenarios fallidos quedan en `cypress/screenshots/` y se incrustan en el informe.

## Informe

`npm test` deja un único HTML autocontenido en:

```text
cypress/reports/html/index.html
```

Incluye el resumen de las features, duración, gráficos, el contexto Gherkin de cada escenario y las
capturas embebidas si hay fallos. La carpeta `cypress/reports/` está ignorada por git: el informe se
regenera en cada ejecución.

El reporte usa `cypress-mochawesome-reporter` con `cucumberSupport` y `cypress-on-fix`, para no
pisar los hooks del preprocesador de Cucumber.

## Estructura

```text
cypress
├── e2e
│   ├── authentication.feature    # login válido y usuario bloqueado
│   └── purchase.feature          # carrito y checkout
├── fixtures
│   ├── users.json                # usuarios de saucedemo
│   └── customer.json             # datos del checkout
├── reports                       # informe generado (ignorado por git)
└── support
    ├── e2e.js                    # carga comandos y tareas
    ├── interactions               # click y escritura
    ├── questions                  # visibilidad y texto
    ├── step_definitions/steps.js  # pasos Gherkin
    ├── tasks                      # login, carrito y checkout
    └── ui                         # selectores por pantalla
```

## Screenplay con Cucumber

| Concepto | Dónde vive | Ejemplo |
|---|---|---|
| Escenario | `cypress/e2e/*.feature` | «Compra de un producto» |
| Paso | `support/step_definitions` | `Cesar agrega una mochila al carrito` |
| Tarea | `support/tasks` | `cy.authenticate(...)` |
| Interacción | `support/interactions` | `cy.typeInto(...)` |
| Pregunta | `support/questions` | `cy.seeVisible(...)` |
| UI | `support/ui` | selectores de login y carrito |

El feature describe el negocio; el paso traduce ese lenguaje a tareas, y las tareas delegan en
interacciones y selectores. Así el escenario no conoce detalles de la interfaz.

## Ten en cuenta

- **Saucedemo es un sitio público de práctica.** No hay datos reales ni credenciales privadas.
- **Los tests dependen de la red.** Si saucedemo no responde, fallan por el sitio, no por el código.
- **Cypress 16 requiere Node 22 o superior.** Con Node 18 o 20 no arranca.

## Licencia

[MIT](LICENSE) © Cesar Daniel
