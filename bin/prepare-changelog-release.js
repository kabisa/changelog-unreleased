#!/usr/bin/env node
/* eslint-env node, es6 */
const updateChangelog = require("../lib/updateChangelog").default;
const clearChangelogUnreleased = require("../lib/clearChangelogUnreleased").default;
const { version } = require("../lib/package");

try {
  updateChangelog();
  clearChangelogUnreleased();

  process.stdout.write(`Updated CHANGELOG for next version (${version})\n`)
} catch (e) {
  process.stderr.write(`  ${e}\n`);
  process.exit(1);
}
