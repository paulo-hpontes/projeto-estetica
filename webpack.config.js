const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production', 
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',  // Nome do arquivo final gerado
  },
  externals: [nodeExternals()],  // Exclui dependências do Node.js do bundle
  module: {
    rules: [
      {
        test: /\.js$/,  // Aplica Babel a todos os arquivos .js
        exclude: /node_modules/,  // Não transpile arquivos dentro de node_modules
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  devtool: 'source-map',
};
