var config = require("./jest.config");
config.testRegex = "*.integration.ts$"; //Overriding testRegex option
console.log("RUNNING INTEGRATION TESTS");
module.exports = config;
