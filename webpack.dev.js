const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',
	/*入口*/
	entry: {
		app: [
				'react-hot-loader/patch',
				path.join(__dirname, 'src/index.js')
		],
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
	},
	
	/*输出到dist文件夹，输出文件名字为bundle.js*/
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[name].[chunkhash].js'
	},

	module: {
		rules: [
		{
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, 'src')
		},{
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'less-loader']
	 	},{
			test: /\.(png|jpg|gif|svg)$/,
			use: [{
			loader: 'url-loader',
			options: {
			limit: 8192
			}
    }]
		}
		]
	},

	devServer: {
		port: 8080,
		contentBase: path.join(__dirname, '/'),
		historyApiFallback: true,
		host: '0.0.0.0'
	},

	resolve: {
		alias: {
			pages: path.join(__dirname, 'src/pages'),
			components: path.join(__dirname, 'src/components'),
			router: path.join(__dirname, 'src/router'),
			actions: path.join(__dirname, 'src/redux/actions'),
			reducers: path.join(__dirname, 'src/redux/reducers')
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'src/index.html')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	]
};