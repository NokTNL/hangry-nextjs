import { defineConfig } from 'cypress'
import { MyMongoClient } from './src/utils/MyMongoClient'
import { MockMongoServer } from './__tests__/mocks/MockMongoServer'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:spec', async () => {
        await MockMongoServer.init()
      })
      on('task', {
        'db:reset': async () => {
          await MockMongoServer.resetDB()
          return null // Cypress requires returning a value/null to indicate the task has been handled properly
        },
      })
      on('after:run', async () => {
        if (MyMongoClient.client) {
          await MyMongoClient.client.close()
        }
        if (MockMongoServer.server) {
          await MockMongoServer.server.stop()
        }
      })
    },
    baseUrl: 'http://localhost:3000',
    experimentalRunAllSpecs: true,
  },
  experimentalInteractiveRunEvents: true, // To enable listening to the `before:*` or `after:*` events when running `cypress open`. See https://docs.cypress.io/api/plugins/before-run-api
})
