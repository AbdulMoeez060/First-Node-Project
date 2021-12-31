//const products=[];
const path = require("path");
const fs = require("fs");
const { runInThisContext } = require("vm");
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, filecontent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(filecontent));
  });
};

module.exports = class Product {
  constructor(title,imageUrl,description,price) {
    this.title = title;
    this.imageUrl=imageUrl;
    this.description=description;
    this.price=price;
  }
  save() {
    // products.push(this);

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    //return products;
    getProductsFromFile(cb);
  }
};
