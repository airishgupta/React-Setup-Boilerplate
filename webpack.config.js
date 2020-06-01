const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.join(__dirname, "dist");

module.exports = () => {
  return {
    entry: "./src/index.jsx",
    resolve: {
      extensions: [".js", ".jsx"],
    },
    mode: "development",
    output: {
      path: BUILD_DIR,
      publicPath: "/",
      filename: "[name].bundle.js",
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-object-rest-spread"],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "DemoTemplate.html",
        template: "src/template/index.html",
        hash: true,
      }),
    ],
  };
};
