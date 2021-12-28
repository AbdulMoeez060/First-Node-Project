const express= require('express');

const path= require('path');//For joining paths
const rootDir= require('../utils/paths')

const adminData= require("./admin");
const router = express.Router();


router.get('/',(req,res,next)=>{
    //console.log("Another Middleware");
    console.log("shop js",adminData.products);//we dont do this as this will be shared in all user in the server
   // res.sendFile(path.join(rootDir,'views','shop.html'));//for making out paths as path system is different on windows and linux
   res.render('shop',{prods:adminData.products, pageTitle:'Shop' , path:'/', hasProds:adminData.products.length>0});//for rendering pug
});

module.exports = router;