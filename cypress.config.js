import '@cypress/instrument-cra'
const {defineConfig} = require('cypress')
const codeCoverageTask = require('@bahmutov/cypress-code-coverage/plugin')

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)
      return config
    },
  },

  component: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)
      return config
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      webpackConfig: {
        // workaround to react scripts 5 issue https://github.com/cypress-io/cypress/issues/22762#issuecomment-1185677066
        devServer: {
          port: 3001,
        },
      },
    },
  },
})
