module.exports = {
  // ... other configurations
  module: {
      rules: [
          {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
      ]
  },
  mode: "development"
};