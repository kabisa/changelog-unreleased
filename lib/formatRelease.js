const unified = require("unified");
const parseMarkdown = require("remark-parse");
const printMarkdown = require("remark-stringify");
const prettier = require("prettier");
const filterTree = require("./filterTree").default;
const complement = require("./complement").default;

const { version } = require("./package");

const getSubstitutions = () => ({
  date: new Date().toISOString().slice(0, 10),
  version
});

const isEmptyHeading = (node, index, parent) => {
  const nextNode = ((parent || {}).children || [])[index + 1];

  if (node.type !== "heading") return false;
  if (!nextNode) return true;
  if (nextNode.type === "heading" && nextNode.depth <= node.depth) return true;

  return isEmptyHeading(nextNode, index + 1, parent);
};

const removeEmptyHeadings = ast => filterTree(complement(isEmptyHeading), ast);

const format = (format, substitions) =>
  Object
    .entries(substitions)
    .reduce((acc, [key, value]) => acc.replace(`{${key}}`, value), format);

const formatRelease = entry => {
  const { contents } = unified()
    .use(parseMarkdown)
    .use(() => removeEmptyHeadings)
    .use(printMarkdown)
    .processSync(entry);

  return prettier.format(
    format(contents, getSubstitutions()),
    { parser: "markdown" }
  );
};

module.exports.default = formatRelease;
