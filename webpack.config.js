const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	entry: {
        main: './src/index.js'
    },
	output: {
        filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /.js?$/,
			include: [
				path.resolve(__dirname, 'src')
			],
			exclude: [
				path.resolve(__dirname, 'node_modules')
			],
			loader: 'babel-loader'
		}]
	},
	resolve: {
		extensions: ['.json', '.js', '.jsx', '.css']
	},
	devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLPlugin({
            title: 'Hot Module Replacement',
            template: path.join(__dirname, 'src/template.html')
        })
    ]
};

if (isDev) {
    config.devServer = {
        host: '0.0.0.0',
        port: '3000',
        contentBase: '.dist',
        hot: true
    };

    config.plugins = config.plugins.concat([
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]);
}

module.exports = config;