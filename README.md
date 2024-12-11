# KONG-CYPRESS-AUTOMATION-DY
- This is the end-to-end UI automation of Kong manager based on Cypress
- Repository link: https://github.com/Landy330/KONG-CYPRESS-AUTOMATION-DY

# About Project
1. TestCases
    - Each test suite is differentiated according to functional modules. This project follows the Page-Object design pattern. The element and specific use steps of the test cases are put in the /cypress/page/ folder. While the test cases in the /cypress/e2e/ folder only call the operation method, which leads to higher code reusability, flexibility, and readability.
    - Test cases for the Service Page and Route Page have been added as examples.
    - Use the before(), after(), beforeEach(), and afterEach() hooks to create or destroy test data and restore the test environment.
    - API requests have been added, which can improve the success rate of creating precondition data and destroying test data. The API calling methods are located in the utils folder.
2. Configurations
    - Test accounts, baseUrl, etc. can be stored in the /cypress/config/ folder according to different running environments.

    - It supports passing in test environment parameters based on CYPRESS_environment and reading the corresponding configurations, such as baseUrl.

    - The test data is located in /cypress/fixture/, which is convenient for reading and using. It provides varieties of input data for test cases to ensure that the tests cover all possible situations.
3. Reports
    - In cypress.config.ts, mochawesome is configured to collect result data and generate test reports, which are saved in the /cypress/reports/ and screenshots folders. If a test case fails, the report will clearly present the failure reason and detailed error information to help you quickly locate the root cause of the problem. You can use a browser to open the HTML file to view the detailed visual report.
      ![mochawesome-report](https://github.com/Landy330/KONG-CYPRESS-AUTOMATION-DY/blob/master/img/reports.png?raw=true)

# Installation and  Run
1. Open the Cypress Test Runner Interface and Start Tests
    ```sh
    npx tsc && CYPRESS_environment=dev npx cypress open
    ```

    Run Tests Directly
    ```sh
    npx tsc && CYPRESS_environment=dev npx cypress run
    ```
2. Generate mochawesome Reports Locally
    Installation:
    ```sh 
    npm install --save-dev cypress-mochawesome-reporter
    ```
    
    Report Generation
    ```sh
    npx mochawesome-merge cypress/reports/*.json > merged-report.json
    npx mochawesome-report-generator merged-report.json -o cypress/reports/merged-html-report

    ```

# Future Optimization Directions
1. Improve the logic of the BasePage, such as encapsulating the element interaction methods in Cypress to reduce code redundancy.
2. If API calls in other test environments require authentication, it is necessary to add methods for obtaining and updating tokens and add them to the request headers.
3. The CI process of Github Actions still needs to be improved.
4. Use the coverage statistics plugins of test cases.

# Thought
This assignment was an interesting process of exploration and reflection.

It was my first time to use the Cypress tool. During the coding process, I felt that Cypress is lightweight, convenient, and powerful. It is an automated tool that can be quickly used.
If there had been more time and I had known more about Kong's products, there would have been more for optimizing the code structure and implementation. I could have used more advanced features of Cypress, such as custom commands, to better adapt to specific application and improve the speed and stability of writing test cases. Of course, I'm very happy to discuss if there are better suggestions.

However, in the actual project progress, there were also some challenges. For example, with the continuous iterative update of application functions, how to ensure that a large number of test cases can be updated timely and always keep in line with the latest version of the application is a problem that urgently needs to be solved. This is also an important reason why many companies cannot persist in maintaining UI automation.

By the way: The data-testid attribute is so convenient. Thanks to the developers. And the attribute values of elements are flexible. For example, they can just be the ids of data, which greatly improves the efficiency of element location.

# Version
v1.0.0
