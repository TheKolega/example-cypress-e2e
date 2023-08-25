import { defineConfig } from "cypress"
import vitePreprocessor from "cypress-vite"
import path from "path"

export default defineConfig({
  blockHosts: [
    "*.log.optimizely.com*",
    "*ad.plus*",
    "*adform*",
    "*ads*",
    "*amazon-adsystem*",
    "*analytics*",
    "*doubleclick*",
    "*googleads*",
    "*googlesyndication*",
    "*googletag*",
    "*mgida*",
    "stat-rock*",
  ],
  e2e: {
    baseUrl: "http://the-internet.herokuapp.com",
    chromeWebSecurity: false,
    experimentalStudio: true,
    pageLoadTimeout: 10000,
    setupNodeEvents(on, config) {
      require("@cypress/grep/src/plugin")(config)

      on(
        "file:preprocessor",
        vitePreprocessor({
          configFile: path.resolve(__dirname, "./cypress/vite.config.ts"),
          mode: "development",
        }),
      )

      on("task", {
        consoleLog(message) {
          console.log(message)

          return null
        },
        consoleTable(message) {
          console.table(message)

          return null
        },
      })

      return config
    },
  },
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
    hideXhr: true,
    localUrl: "http://localhost:7466",
    cookieLoginUrl: "https://twopiharris.pythonanywhere.com/login",
    cookieVerifyUrl: "https://twopiharris.pythonanywhere.com/loginTest",
  },
  video: false,
  viewportHeight: 900,
  viewportWidth: 1600,
})
