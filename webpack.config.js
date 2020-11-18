const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const environments = require("./environments");

const MODE = {
  DEV: "development",
  PROD: "production",
};

module.exports = (env, options) => {
  const { mode = MODE.DEV } = options;
  const { server = "local" } = env;
  return {
    mode,
    devServer: {
      contentBase: path.join(__dirname, "./build/"),
      host: "0.0.0.0",
      port: "3000",
      proxy: {
        "/api": { target: environments[server], secure: false },
        "**": {
          bypass(req) {
            if (req.headers.accept.includes("html")) {
              return "/index.html";
            }
          },
        },
      },
      hot: true,
      overlay: true,
      https: server !== "local",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      historyApiFallback: true,
    },
    resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"] },
    entry: {
      polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
      application: "./index.tsx",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          exclude: /node_modules/,
          test: /\.(tsx|ts)?$/,
        },
        {
          test: /\.(scss|css)?$/,
          use: [
            mode === MODE.DEV ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                  exportLocalsConvention: "camelCaseOnly",
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    output: {
      path: path.join(__dirname, "./build/"),
      filename: "js/[name].[contenthash].js",
      publicPath: "/",
    },
    optimization: {
      splitChunks: {
        automaticNameDelimiter: ".",
        cacheGroups: {
          modules: {
            name: "modules",
            test: /[\\/]node_modules[\\/]/,
            chunks(chunk) {
              return chunk.name === "application";
            },
            maxSize: 128000,
          },
        },
      },
    },
    plugins: [
      new CleanWebpackPlugin({ verbose: true }),
      new HTMLWebpackPlugin({
        title: "React Application",
        filename: "index.html",
        template: "public/index.html",
        favicon: "public/favicon.ico",
        chunks: ["polyfill", "modules", "application"],
        hash: true,
        xhtml: true,
        inject: true,
      }),
      new CopyPlugin({ patterns: [{ from: "*.png", context: "public" }] }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[id].css",
      }),
    ],
  };
};
