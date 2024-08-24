const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Importe o plugin

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true, // Abre o navegador automaticamente
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Caminho para o seu index.html
      filename: 'index.html', // Nome do arquivo de saída
    })
  ],
};