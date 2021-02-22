const path = require('path');
const join = p => path.join(__dirname, p);

module.exports = function (config) {
    config.resolve.alias["@"] = join("src");
    config.resolve.alias["@UI"] = join("src/Components/UI");

    return config;
}