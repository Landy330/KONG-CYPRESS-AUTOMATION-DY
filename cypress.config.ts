import { defineConfig } from "cypress";
import fs from 'fs';

export default defineConfig({
  projectId: 'kong',
  e2e: {
    setupNodeEvents(on, config) {

      config.chromeWebSecurity = false;

      // setup testing environment
      config.env.environment = config.env.environment || "dev"
      const environment = config.env.environment

      fs.readFile('./cypress/config/env_config.json', (err, data) => {
        if (err) {
          return console.log('Read file error: ' + err.message)
        }
        try {
          const envData = JSON.parse(data.toString());
          config.env.baseUrl = envData[environment]["base_url"]
          config.env.baseRoute = envData[environment]["base_route"]
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
        
        
      })
        
      return config;
    },
    // setting report generator as mochawesome
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports', // directory of report data
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    }
  },
});
