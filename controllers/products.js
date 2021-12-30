const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    //res.sendFile(path.join(rootDir,'views','add-product.html'))
    res.render('add-product',{pageTitle:'Add Product', path:'/admin/add-product'});
}
//const products= [];
exports.postAddProduct = (req,res,next)=>{
    const product = new Product(req.body.title);
    product.save();
    //products.push({title: req.body.title});
    res.redirect('/');
}

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((product)=>{
        res.render('shop',{prods:product, pageTitle:'Shop' , path:'/', hasProds:product.length>0});//for rendering pug

    });
    //console.log("Another Middleware");
    //console.log("shop js",product);//we dont do this as this will be shared in all user in the server
   // res.sendFile(path.join(rootDir,'views','shop.html'));//for making out paths as path system is different on windows and linux
}