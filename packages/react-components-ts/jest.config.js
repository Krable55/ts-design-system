const {defaults} = require('jest-config');

// Or async function
module.exports = {
    // Sync object
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    setupFilesAfterEnv: ["./test/setup.ts"],
    verbose: true,
};