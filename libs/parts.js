const webpack = require('webpack');

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
}







