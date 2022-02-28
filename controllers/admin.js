const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  //res.sendFile(path.join(rootDir,'views','add-product.html'))
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
//const products= [];
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, price, description, imageUrl);

  product
    .save()
    .then((result) => {
      console.log("Added Prod");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then((product) => {
//       res.render("admin/products", {
//         prods: product,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       }); //for rendering pug
//     })
//     .catch((err) => console.log(err));
// };

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;

//   req.user
//     .getProducts({ where: { id: prodId } })
//     //Product.findByPk(prodId)
//     .then((products) => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImgUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.imageUrl = updatedImgUrl;
//       product.description = updatedDesc;
//       return product.save();
//     })
//     .then((result) => {
//       console.log("Updated Product");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       product.destroy();
//     })
//     .then((result) => {
//       console.log("Prod deleted");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };
