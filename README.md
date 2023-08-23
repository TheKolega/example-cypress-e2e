# example-cypress-e2e

### General testing

On initial setup, create the Cypress secrets .env file

```console
cp test/cypress.env.json.example test/cypress.env.json
```

To start a headless test run use

```console
pnpm test
```

and to open the Cypress UI use

```console
pnpm test-open
```

### Local app testing

To test the local deployment, first run the following command in a separate terminal window:

```console
pnpm start-app
```
