const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
    },
    entry: {
        app: "./src/index.tsx",
    },
    output:{
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: "/",
    },

  //Setup loaders
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, 
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ]
  },
    
  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      }),
  ]

}


// const path = require('path');

// module.exports = {
//   entry: './src/index.tsx',
//   devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };