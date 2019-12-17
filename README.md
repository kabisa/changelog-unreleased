# changelog-unreleased

## Why?

On some projects we had issues with items ending up in the wrong release in the
`CHANGELOG`. An example of how this can happen:

1. A pull request (A) is created and in this PR an item is added to the
   "unreleased" part of the CHANGELOG.
2. When a new release is prepared, the "unreleased" section is updated to mark
   it as released.
3. Pull request A is merged. The item is added to the section that
   was previously "unreleased", but is now part of a release that was done in
   the past.

To solve this, you can add a new file that contains only unreleased changelog
items. When preparing a release, you add the contents of this file to the actual
changelog and start with a blank unreleased changelog file.

The same scenario would now enfold as follows:

1. A pull request (A) is created and in this PR an item is added to the
   "CHANGELOG-UNRELEASED" file.
2. When a new release is prepared, all contents of the "CHANGELOG-UNRELEASED"
   file are added to the "CHANGELOG". The "CHANGELOG-UNRELEASED" is file is
   replaced by a blank "CHANGELOG-UNRELEASED" file.
3. Pull request A is merged and its changelog items are added to the new
   "CHANGELOG-UNRELEASED" file.

When another release is prepared, the changes added in pull request A are in the
correct part of the changelog.

## Tooling

This NPM package adds some tooling to work with these files. It exposes a single
executable that can be used to add the contents of your "CHANGELOG-UNRELEASED"
to your "CHANGELOG". It also replaces your "CHANGELOG-UNRELEASED" with a
"CHANGELOG-TEMPLATE" afterwards, so all your releases will be in the same
format.

The command can be called as follows when using yarn:

```
yarn prepare-changelog-release
```

It also assumes that your changelog files are in Markdown and removes any
headings that have no content.

## Configuration

This tool currently *requires* you to add configuration to your `package.json`.
An example of the configuration can be found in the [package.json](package.json)
of this repository.

The template file can contain magic strings that will be substited when you run
the `prepare-changelog-release` command. The following are currently supported:

* `{version}` is replaced with the current version number in your
    `package.json`.
* `{date}` is replaced with the current date, formatted according to ISO8601.
