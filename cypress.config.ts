import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({

  e2e: {

    baseUrl: process.env.BASE_URL,

    viewportWidth: 1920,
    viewportHeight: 1080,

    defaultCommandTimeout: 10000,

    video: true,

    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    },

    setupNodeEvents(on, config) {

    },
  },
});
