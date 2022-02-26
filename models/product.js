//const products=[];
const path = require("path");
const fs = require("fs");
const Cart = require("./cart");
const db = require("../utils/database");


module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    // products.push(this);
   return db.execute("insert into products(title,price,imageUrl,description) values (?,?,?,?)",
   [this.title,this.price,this.imageUrl,this.description]
   );
    
  }

  static deleteById(id){
    
  }

  static fetchAll() {
    //return products;
    return db.execute("Select * from products");
  }

  static findbyid(id) {
    return db.execute("select * from products where id=?",[id]);
  }
};
