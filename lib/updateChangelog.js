const fs = require("fs");
const formatRelease = require("./formatRelease").default;
const { config } = require("./package");

const releaseRegExp = new RegExp(config.releaseRegExp);

const updateChangelog = () => {
  const changelog = fs.readFileSync(config.changelogPath, "utf-8");
  const release = fs.readFileSync(
    config.changelogUnreleasedPath,
    "utf-8"
  );

  const lines = changelog.split("\n");
  const latestReleaseLineNr = lines.findIndex(line =>
    line.match(releaseRegExp)
  ) || lines.length;

  const content = [
    ...lines.slice(0, latestReleaseLineNr),
    formatRelease(release),
    ...lines.slice(latestReleaseLineNr)
  ].join("\n");

  return fs.writeFileSync(config.changelogPath, content, "utf-8");
};

module.exports.default = updateChangelog;
