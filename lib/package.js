const path = require("path");
const fs = require("fs");
const pwd = process.cwd();

const packagePath = path.join(pwd, "package.json");
const packageContents = JSON.parse(fs.readFileSync(packagePath));

module.exports = {
  version: packageContents.version,
  config: packageContents["changelog-unreleased"]
};
