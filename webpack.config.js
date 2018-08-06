var path= require('path');

module.exports = {
  entry: './index.js',
  output:{
	filename:'./bundle.js'
  },
  resolve: {
    extensions: [ '.js', '.jsx']
	},
  devServer:{
	  inline: true,
	  historyApiFallback: true,
	  contentBase:'./',
	  port: 3000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
		loader:'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets:['react','es2015']
        }
      }
    ]
  }
};