const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function(options) {
	return {
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,

			stats: 'errors-only',

			host: options.host || '0.0.0.0',
			port: options.port || 3000
		},

		plugins: [
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	}
};

exports.setupCSS = function(paths){
	return {
		module: {
			loaders: [
				{
					test: /\.css$/,
					loaders: ['style', 'css'],
					include: paths
				}
			]
		}
	}
};

exports.extractCSS = function(paths){
	return {
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: paths 
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('[name].[chunkhash].css')
		]
	}
}

exports.minify = function(){
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	}
};

exports.setFreeVariable = function(key, value) {
	const env = {};
	env[key] = JSON.stringify(value);

	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	}
};

exports.extractBundle = function(options){
	const entry = {};
	entry[options.name] = options.entries;

	return {
		// Define an entry point needed for splitting
		entry: entry,
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				names: [options.name, 'manifest']
			})
		]
	}
};

exports.clean = function(path) {
	return {
		plugins: [
			new CleanWebpackPlugin([path], {
				// the path is a relative path
				// to make it absolute, it has to have root
				root: process.cwd()
			})
		]
	}
}







