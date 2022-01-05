const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("shop/product-list", {
      prods: product,
      pageTitle: "All Products",
      path: "/products",
      hasProds: product.length > 0,
    }); //for rendering pug
  });
  //console.log("Another Middleware");
  //console.log("shop js",product);//we dont do this as this will be shared in all user in the server
  // res.sendFile(path.join(rootDir,'views','shop.html'));//for making out paths as path system is different on windows and linux
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId; //product id is the parameter that we passed from the /products/":productId"
  //console.log(Product.findbyid(productId,product=>{}));\
  Product.findbyid(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("shop/index", {
      prods: product,
      pageTitle: "Shop",
      path: "/",
      hasProds: product.length > 0,
    }); //for rendering pug
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findbyid(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
