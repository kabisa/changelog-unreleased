const fs = require("fs");
const { config } = require("./package");

const clearChangelogUnreleased = () =>
  fs.writeFileSync(
    config.changelogUnreleasedPath,
    fs.readFileSync(config.changelogTemplatePath, "utf-8"),
    "utf-8"
  );

module.exports.default = clearChangelogUnreleased;
