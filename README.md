# Hangry NextJS

## Testing

- Both Jest and Cypress are enabled in this project. Test files are located in `/__tests__` (for Jest) and `/cypress`, respectively
- To run Jest tests: `yarn jest`
  - It uses the **Test DB**
- To run Cypress tests:

  - You can run Cypress during development for instant feedback but slower tests. Run `yarn dev` to spin up the development server, then run Cypress with `yarn cypress:dev`
  - Running Cypress against the production build will give you faster tests. Run:
    - `yarn cypress:build` to create a production build with test settings, starts the production server and initialise Cypress
    - Alternatively, you can run `yarn build:test` to create the production build, and then `yarn cypress:start` to start server & test the build
    - **Note:** You need to restart Cypress whenever there is a new production build
  - Both `yarn dev` and `yarn build:test` use a **test database** for reproducibility. `yarn build` uses the real database

Comparison between different types of build :

| Command                                                              | `yarn dev`                      | `yarn build:test`, `yarn start:test`                                             | `yarn build`     |
| -------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- | ---------------- |
| `NODE_ENV` in `next.config.mjs`, `cypress.config.ts` and server code | `development`                   | `test`                                                                           | `production`     |
| `NODE_ENV` in page build/components                                  | `development`                   | `production` (Note: will have an extra env variable `IS_TEST_BUILD` set to true) | `production`     |
| Database                                                             | Test DB, port `50000`           | Test DB, port `60000`                                                            | Live DB          |
| `localhost` port for local server                                    | `4000`                          | `3000`                                                                           | `3000`           |
| Build folder                                                         | `/.next-dev`                    | `/.next`                                                                         | `/.next`         |
| Cypress timeout for DOM assertions (`defaultCommandTimeout`)         | `10000` (dev page load is slow) | `4000` (default)                                                                 | `4000` (default) |
| ChakraUI `toast` duration prop                                       | `5000` (default)                | `100` (to prevent covering clickable elements)                                   | `5000` (default) |
