const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/app.js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./src/dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MinCssExtractionPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(jpg|.jpg?)$/,
        loader: "file-loader",
        options: {
          /* publicPath: "./src/static/images/", */
          name: "[name].[ext]",
          outputPath: "./static/images",
        },
      },
    ],
  },
};
