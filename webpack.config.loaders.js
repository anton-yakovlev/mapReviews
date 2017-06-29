let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg|)$/i,
            loader: 'file-loader?name=images/[hash].[ext]'
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[hash].[ext]'
        },
        {
            test: /\.pug$/,
            loader: 'pug-loader',
            options: {
                data: {
                    pretty: false
                }
            }
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader'
            })
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',

                use: [
                    {
                        loader: 'css-loader'
                    },
                    'sass-loader'
                ]
            })
        },
        {
            test: /\.hbs$/,
            exclude: /node_modules/,
            loader: 'handlebars-loader'
        },
    ];
};
