const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts')


const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

const common = {
	entry : {
		app: PATHS.app
	},

	output: {
		path: PATHS.build,
		filename: '[name].js'
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack demo'
		}),
		new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
	]
};

let config;

switch(process.env.npm_lifecycle_events) {
	case 'build':
		config = merge(
			common, 
			{
				devtool: 'source-map'
			},
			parts.minify(),
			parts.setupCSS(PATHS.app)
		);
		break;
	default:
		config = merge(
			common,
			{
				devtool: 'eval-source-map'
			},
			parts.minify(),
			parts.setupCSS(PATHS.app),
			parts.devServer({
				host: process.env.HOST,
				port: process.env.PORT
			})
		);
}

module.exports = validate(config);







