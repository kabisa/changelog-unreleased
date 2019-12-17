const complement = fn => (...args) => !fn(...args);

module.exports.default = complement;
