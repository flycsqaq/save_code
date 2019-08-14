/* eslint-disable */
const styleRules = require("./style");
const jsRules = require("./js");
const fileRules = require("./file");

module.exports = [...styleRules, ...jsRules, ...fileRules];
