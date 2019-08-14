/* eslint-disable */
const path = require("path");

exports.resolve = (...args) => {
    return path.join(__dirname, "../", ...args);
};

exports.resolveDist = (...args) => {
    return resolve("dist/", ...args);
};
