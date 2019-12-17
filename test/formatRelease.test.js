const { expect } = require("chai");
const formatRelease = require("../lib/formatRelease").default;

const strip = str => str.trim().replace(/^ +/mg, "");

describe("formatRelease", () => {
  it("does not touch non-empty headers", () => {
    const input = strip(`
      # H1

      ## H2

      ### H3

      Content
    `);
    const result = formatRelease(input).trim();

    expect(result).to.eq(input);
  });

  it("removes empty heading", () => {
    const input = strip(`
      # H1
    `);
    const result = formatRelease(input).trim();

    expect(result).to.eq("");
  });

  it("removes heading with nested empty headings", () => {
    const input = strip(`
      # H1

      ## H2

      ### H3
    `);
    const result = formatRelease(input).trim();

    expect(result).to.eq("");
  });

  it("makes the contents pretty", () => {
    const input = strip(`
      #    Added

      - Item 1     
      -    Item 2
    `);
    const expected = strip(`
      # Added

      - Item 1
      - Item 2
    `);
    const result = formatRelease(input).trim();

    expect(result).to.eq(expected);
  });

  it("substitutes the current date and version", () => {
    const isoDate = new Date().toISOString().slice(0, 10);
    const version = require("../package.json").version;

    const input = strip(`
      # v{version} - {date}

      This is content so that the heading is not empty
    `);
    const expected = strip(`
      # v${version} - ${isoDate}

      This is content so that the heading is not empty
    `);
    const result = formatRelease(input).trim();

    expect(result).to.eq(expected);
  });
});
