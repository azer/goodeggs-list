var format = require("new-format");
var request = require("hyperquest");
var concat = require("concat-stream");
var resumer = require("resumer");
var JSONStream = require("JSONStream");
var closestPickupDay = require("./pickup-day");
var parser = JSONStream.parse();

var urlPattern = 'http://www.goodeggs.com/{0}/product_listings?category={1}&pickupDay={2}';

module.exports = list;

function list (category, area, pickupDay) {
  var stream = resumer(write);
  pickupDay || (pickupDay = closestPickupDay());

  request(url(area, category, pickupDay)).pipe(parser).pipe(stream);

  return stream;

  function write (data) {
    this.queue({
      pickupDay: pickupDay,
      products: refine(data, vendors(data.vendors))
    });
  }
}

function url (area, category, pickupDay) {
  return format(urlPattern, area, category, pickupDay);
}

function refine (data, vendors) {
  return data.products.map(function (product) {
    var photo;
    var firstPhoto = product.photos[0];;

    if (firstPhoto.attachments && firstPhoto.attachments[0] && firstPhoto.attachments[0].original) {
      photo = firstPhoto.attachments[0].original.url;
    } else if (firstPhoto.inkPhoto) {
      photo = firstPhoto.inkPhoto.baseUrl;
    }

    return {
      id: product._id,
      price: product.price,
      name: product.name,
      photo: photo,
      vendor: vendors[product.vendor].name,
      unit: product.unit
    };
  });
}

function vendors (data) {
  var dict = {};

  var i = data.length;
  while (i--) {
    dict[data[i]._id] = data[i];
  }

  return dict;
}
