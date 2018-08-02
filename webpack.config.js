var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var YAML = require('yamljs');

var entries = {};
var modulePath = "./public_html/modules"

function createDir(d) {
  if (!fs.existsSync(d)){
    fs.mkdirSync(d);
  }
}

function isDirectory(source) {
  return fs.lstatSync(source).isDirectory();
}

function getDirectories(source) {
  return fs.readdirSync(source).map(function(name) {
    return path.join(source, name);
  }).filter(isDirectory);
}

function generateSpecEntries() {
  var moduleDirs = getDirectories("src/modules/");
  moduleDirs.forEach(function(dirPath) {
    var moduleDirName = dirPath.split("/").pop();
    createDir(modulePath + "/" + moduleDirName);

    var config = YAML.load(dirPath + "/config.yml");
    config.module.labs.forEach(function(lab) {
      var labDir = dirPath + "/labs/" + lab.dir;
      var labEntryName = "modules/" + moduleDirName + "/" + lab.dir + "/specs";
      entries[labEntryName] = "./" + labDir + "/specs.js";
    });
  });

  console.log(entries);
}

createDir(modulePath);
generateSpecEntries();

entries["fuchsia"] = "./src/fuchsia";

module.exports = {
  context: __dirname,
  entry: entries,
  output: {
    path: __dirname + "/public_html/scripts",
    filename: "[name].js"
  },
  resolve: {
    alias: {
      util: path.resolve(__dirname, 'src/util/'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env["NODE_ENV"] || "production"),
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel", exclude: /node_modules/ },
      { test: /\.json$/, loader: "json" },
      { test: /\.ya?ml/, loader: "json!yaml" },
    ],
    rules: [
      {
        test: require.resolve('chai/chai.js'),
        use: 'script-loader'
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".yml"],
  },
};
