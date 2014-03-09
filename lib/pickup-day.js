var format = require("new-format");

module.exports = closestPickupDay;

function closestPickupDay () {
  var obj = new Date(Date.now() + 86400000 * 2);

  while (obj.getDay() > 4) {
    obj = new Date(+(obj) + 86400000);
  }

  var year = obj.getFullYear();
  var month = obj.getMonth() + 1;
  var day = obj.getDate();

  return format('{year}-{month}-{day}', {
    year: year,
    month: month < 10 ? '0' + month : month,
    day: day < 10 ? '0' + day : day
  });
}
