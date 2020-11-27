const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry : './index.ts',
    output:{
        path: `${__dirname}/dist`,
        filename: 'index.js'
    },
    resolve:{
        extensions: ['.ts','.js']
    },
    module : {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new NodemonPlugin()
    ]
}