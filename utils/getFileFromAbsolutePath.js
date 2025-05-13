const path = require("path");

module.exports = function getFileFromAbsolutePath(relativePath) {
  return path.join(__dirname, '..', relativePath);
};