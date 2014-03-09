## goodeggs-list

List [GoodEggs](http://goodeggs.com)

## Install

```bash
$ npm install goodeggs-list
```

## Usage

Available methods:

* produce
* dairy
* meat
* bakery
* local
* kitchen
* gifts

Each will return a stream of the products listed under that category:

```js
list = require('goodeggs-list')

list.produce('sfbay').pipe(process.stdout)
// => [{
         id: "52fecdb4ff235302000003bb",
         name: "Washington Navel Oranges",
         price: 2.5,
         vendor: "Will's Avocados",
         unit: "1b",
         photo: "//foobar.com/orange.jpg"
       },
       ...
      ]
```

To choose a specific date, pass:

```js
list.produce('sfbay', '2014-03-11').pipe(process.stdout)
```
