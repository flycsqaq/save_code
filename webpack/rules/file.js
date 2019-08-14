/* eslint-disable */
const { resolve } = require("../utils");

module.exports = [
    {
        test: /\.svg$/,
        loader: "@svgr/webpack",
        include: resolve("src")
    },
    {
        test: /\.md$/,
        use: [
            {
                loader: "html-loader?name=md/[name].[hash:6].[ext]"
            },
            {
                loader: "markdown-loader"
            }
        ],
        include: resolve("docs")
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            {
                loader: "file-loader?name=img/[name].[hash:6].[ext]"
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
    }
];
