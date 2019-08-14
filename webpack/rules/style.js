/* eslint-disable */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
    },
    {
        test: /\.s(a|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "typings-for-css-modules-loader",
                options: {
                    modules: true,
                    namedExport: true,
                    camelCass: true,
                    sass: true
                }
            },
            "sass-loader"
        ]
    }
];
