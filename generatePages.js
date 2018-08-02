var path = require("path");
var fs = require("fs");
var YAML = require('yamljs');

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

function getTemplate(fileName) {
  return fs.readFileSync(fileName, { encoding: 'utf8' });
}

function generateModuleHTML(moduleDir) {
  var config = YAML.load(moduleDir + "/config.yml");
  var templateContents = getTemplate("./src/templates/module_template.html");
  templateContents = templateContents.replace("#{title}", config.module.title);

  var moduleDirName = modulePath + "/" + moduleDir.split("/").pop();
  createDir(moduleDirName + "/labs");

  var labLinksList = '<ul class="moduleLabsList">';
  var i = 1;
  config.module.labs.forEach(function(lab) {
    labLinksList += '<li><a href="labs/'+lab.dir+'/">'+i+'.'+lab.name+'</a></li>';
    i++;
  });
  labLinksList += '</ul>';
  templateContents = templateContents.replace("#{labs_list}", labLinksList);
  templateContents = templateContents.replace("#{module_html}", getTemplate(moduleDir + "/module.html"));

  fs.writeFile(moduleDirName + "/index.html", templateContents);
}

function generateLabHTML(moduleDir) {
  var config = YAML.load(moduleDir + "/config.yml");
  var templateContents = getTemplate("./src/templates/lab_template.html");

  config.module.labs.forEach(function(lab) {
    var labDir = moduleDir + "/labs/" + lab.dir;
    templateContents = templateContents.replace("#{lab_name}", lab.name);
    templateContents = templateContents.replace("#{lab_instructions}", getTemplate(labDir + "/instructions.html"));

    var labScript = moduleDir.replace("src/", "") + "/" + lab.dir + "/specs.js";
    templateContents = templateContents.replace("#{lab_spec}", labScript);

    var labHtmlDir = labDir.replace("src", "public_html");
    createDir(labHtmlDir);
    fs.writeFile(labHtmlDir + "/index.html", templateContents);
  });
}

function build() {
  var moduleDirs = getDirectories("src/modules/");
  moduleDirs.forEach(function(dirPath) {
    var moduleDirName = dirPath.split("/").pop();
    createDir(modulePath + "/" + moduleDirName);

    generateModuleHTML(dirPath);
    generateLabHTML(dirPath);
  });
}

createDir(modulePath);
build();