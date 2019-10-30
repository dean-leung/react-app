module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ]
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  }
}