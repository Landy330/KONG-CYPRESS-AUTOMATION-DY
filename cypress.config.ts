import { defineConfig } from "cypress";
// import * as fs from 'fs';


export default defineConfig({
  projectId: 'qzjvkx',
  // projectId: 'kong',
  e2e: {
    setupNodeEvents(on, config) {
    
      config.chromeWebSecurity = false;

      // setup testing environment
      config.env.environment = config.env.environment || "ga"
      const environment = config.env.environment

      // fs.readJson('./config/env_config.json')
      // .then((envData: { [key: string]: { [key: string]: any } }) => {
      //   if (envData[environment]) {
      //     config.env.baseUrl = envData[environment].base_url
      //   }
      // })

      config.env.baseUrl = 'http://localhost:8002';
      // config.env.apiKey = 'your_api_key';
      return config;
    },
  },
});
