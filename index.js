var list = require("./lib/list");
var categories = require("./lib/categories");

categories.forEach(function (key) {
  exports[key] = newListing(key);
});

exports.categories = categories;
exports.list = list;

function newListing (key) {
  return function (area, pickupDay) {
    return list(key, area, pickupDay);
  };
}
