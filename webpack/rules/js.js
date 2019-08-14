/* eslint-disable */
const { resolve } = require("../utils");
module.exports = [
    {
        test: /\.(j|t)s(x?)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [resolve("src")]
    },
    {
        test: /\.ts(x)$/,
        use: [
            {
                loader: "ts-loader"
            }
        ]
    }
];
