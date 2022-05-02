const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    entry: './fronted/main.js',
    output: {
        path: path.resolve(__dirname, 'backend/public'),
        filename: 'main-bundle.js',
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            // {
            //     test: /\.ejs$/,
            //     loader: 'ejs-loader',
            //     options: {
            //         esModule: false
            //     }
            // },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }

        ]
    },

    plugins: [
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     template: '!!raw-loader!./fronted/views/index.ejs',
        //     // nombre con el que regresara empaquetado
        //     filename: './index.html',
        // }),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     template: '!!raw-loader!./fronted/views/carta.ejs',
        //     // nombre con el que regresara empaquetado
        //     filename: './carta.html',
        // }),
        new MiniCssExtractPlugin()
    ]
}