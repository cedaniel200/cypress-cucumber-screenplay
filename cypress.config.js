const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress + Cucumber + Screenplay — Demo Saucedemo',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    saveJson: true,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    async setupNodeEvents(cypressOn, config) {
      const on = require('cypress-on-fix')(cypressOn)
      await addCucumberPreprocessorPlugin(on, config)
      require('cypress-mochawesome-reporter/plugin')(on)
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )
      return config
    },
  },
})
