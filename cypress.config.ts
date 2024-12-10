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
    // 设置测试报告生成器为mochawesome
    reporter:'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports', // 指定报告生成的目录，可以根据需要修改
      overwrite: false, // 是否覆盖之前的报告，可根据需求调整
      html: true, // 是否生成HTML格式的报告，这里设置为是
      json: true, // 是否生成JSON格式的报告，用于后续可能的处理
      charts: true, // 是否在报告中显示图表，增强可视化效果
    }
  },
});
