var list = require("./");
var concat = require("concat-stream");
var JSONStream = require("JSONStream");

list.produce('sfbay')
  .pipe(JSONStream.stringify('\n', '\n, \n', '\n', '    '))
  .pipe(process.stdout);
