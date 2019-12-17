const filterTree = (predicate, node, index = null, parent = null) => {
  if (!predicate(node, index, parent)) return null;
  if (!node.children) return node;

  const children = node.children
    .map((child, index) => filterTree(predicate, child, index, node))
    .filter(Boolean);

  return {
    ...node,
    children
  };
};

module.exports.default = filterTree;
