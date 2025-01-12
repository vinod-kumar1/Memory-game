const path = require("path"); // Core Node.js module for file paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to generate the HTML file
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Plugin for extracting CSS
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Plugin to clean the output folder

module.exports = {
  // Entry point for the application
  entry: "./src/index.js",

  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"), // Output folder
    filename: "bundle.[contenthash].js", // Bundled file with content hash for cache-busting
  },

  // Mode: 'development' or 'production'
  mode: process.env.NODE_ENV || "development",

  // Configuration for development server
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000, // Development server port
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // For React Router
  },

  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.js?$/, // Match .js or .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader", // Transpile ES6+ and JSX
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          "css-loader", // Resolve CSS imports
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/, // Match image files
        type: "asset/resource", // Handle assets
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // Match font files
        type: "asset/resource", // Handle fonts
      },
    ],
  },

  // Plugins for additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML template
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css", // Extracted CSS file name
    }),
    new CleanWebpackPlugin(), // Clean the output folder before each build
  ],

  // Resolve extensions for imports
  resolve: {
    extensions: [".js", ".jsx"], // Resolve .js and .jsx files
  },
};
