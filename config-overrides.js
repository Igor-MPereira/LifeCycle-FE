const path = require('path');
module.exports = {
    webpack: function(config, env) {
        return config;
    },
    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);

            // config.https = {
            //     key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
            //     cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
            //     ca: fs.readFileSync(process.REACT_HTTPS_CA, 'utf8'),
            //     passphrase: fs.readFileSync(process.env.REACT_HTTPS_PASS)
            // };

            return config;
        }
    },
    jest: function(config) {
        // ...add your jest config customisation...
        // Example: enable/disable some tests based on environment variables in the .env file.
        if (!config.testPathIgnorePatterns) {
          config.testPathIgnorePatterns = [];
        }
        if (!process.env.RUN_COMPONENT_TESTS) {
          config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
        }
        if (!process.env.RUN_REDUCER_TESTS) {
          config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
        }
        return config;
    },
    paths: function(paths, env) {
        paths["@"] = path.resolve(__dirname, "src");
        return paths;
    }
}