/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("./utils");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: resolve("public/index.html"),
        title: "tools"
    }),
    new MiniCssExtractPlugin({
        filename: "[hash:6].css"
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerHost: "127.0.0.1",
        analyzerPort: 8888, // 运行后的端口号
        reportFilename: "report.html",
        defaultSizes: "parsed",
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: "stats.json",
        statsOptions: null,
        logLevel: "info"
    })
];
