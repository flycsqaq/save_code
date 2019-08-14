/* eslint-disable */
const TsconfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");
const { resolve } = require("./utils");
const rules = require("./rules/index");
const plugins = require("./plugins");

module.exports = {
    entry: {
        app: resolve("src/index.tsx")
    },
    output: {
        path: resolve("dist"),
        filename: "js/[name].js"
    },
    module: {
        rules: [...rules]
    },
    plugins: [...plugins],
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx"],
        plugins: [
            new TsconfigPathsWebpackPlugin({
                configFile: resolve("tsconfig.json")
            })
        ]
    },
    optimization: {}
};
