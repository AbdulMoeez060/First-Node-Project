const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  //res.sendFile(path.join(rootDir,'views','add-product.html'))
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing:false
  });
};
//const products= [];
exports.postAddProduct = (req, res, next) => {
  
  const title=  req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price=  req.body.price;

  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then().catch(err=>console.log(err));
  //products.push({title: req.body.title});
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
  Product.findbyid(prodId,product=>{
    if (!product) {
      return res.redirect('/');
      
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing:editMode,
      product:product
    });
  })
  
};

exports.postEditProduct =(req,res,next)=>{
  const prodId= req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  
  const updatedProduct =  new Product(prodId,updatedTitle,updatedImgUrl,updatedDesc,updatedPrice);
  updatedProduct.save();
  res.redirect("/admin/products");

}

exports.postDeleteProduct = (req,res,next)=>{
  const prodId= req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');

}