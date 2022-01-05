const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  //res.sendFile(path.join(rootDir,'views','add-product.html'))
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};
//const products= [];
exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product.save();
  //products.push({title: req.body.title});
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("admin/products", {
      prods: product,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProds: product.length > 0,
    }); //for rendering pug
  });
};

exports.getEditProduct = (req, res, next) => {

  const editMode= req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  res.render("admin/edit-product", {
    pageTitle: "edit Product",
    path: "/admin/edit-product",
    editing:editMode
  });
};
