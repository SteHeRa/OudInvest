const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  devtool: "source-map",
  stats: {
    logging: "verbose",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
