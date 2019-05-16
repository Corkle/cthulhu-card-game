const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './www/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'www/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'] 
            }
          },
          { loader: 'eslint-loader' }
        ]
      },
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/src/index.html' 
    })
  ]
}
