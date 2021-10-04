const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'production',
  entry: {
		index: './main.ts',
		preload: './preload.ts',
	},
	devtool: 'inline-source-map',
	target: 'electron-main',
	plugins: [
		new Dotenv(),
	],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
				include: [
					path.resolve(__dirname, './'),
				],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
		modules: [
			path.join(__dirname, 'node_modules'),
		],
  },
  output: {
    // filename: '[name].bundle.js',
    filename: (pathData) => {
			return pathData.chunk.name === 'preload' ? 'preload.js' : 'bundle.js';
		},
    path: path.resolve(__dirname, 'dist'),
  },
};
