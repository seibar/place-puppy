const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyes-webpack-plugin');

module.exports = {
	entry: {
		'main': './src/components/main.js'
	},

	output: {
		path: path.resolve(__dirname, 'dist/public'),
		filename: '[name].js'
	},

	externals: {
		'react': 'React'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	plugins: [
		new UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
			output: {
				comments: false
			}
		})
	]
};