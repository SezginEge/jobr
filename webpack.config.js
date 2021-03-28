const path = require("path");

module.exports = {
  entry: "./src/jobr.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  output: {
    library: "jobr",
    libraryTarget: "umd",
    filename: "jobr.js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this"
  },
  mode: "production"
};
