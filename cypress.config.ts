import { defineConfig } from 'cypress'
// import { MockMongoServer } from './__tests__/mocks/MockMongoServer.mjs'

export default defineConfig({
  e2e: {
    // TODO: add this back and add in spec
    // setupNodeEvents(on, config) {
    //   on('task', {
    //     'db:reset': async () => {
    //       await MockMongoServer.resetDB()
    //       return null // Cypress requires returning a value/null to indicate the task has been handled properly
    //     },
    //   })
    // },
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'http://localhost:3000',
    experimentalRunAllSpecs: true,
  },
  experimentalInteractiveRunEvents: true, // To enable listening to the `before:*` or `after:*` events when running `cypress open`. See https://docs.cypress.io/api/plugins/before-run-api
  defaultCommandTimeout: process.env.NODE_ENV === 'development' ? 10000 : 4000,
  viewportWidth: 375,
})
