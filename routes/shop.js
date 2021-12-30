const express= require('express');

const path= require('path');//For joining paths
const rootDir= require('../utils/paths')

const productsController= require("../controllers/products");
const router = express.Router();


router.get('/',productsController.getProducts);

module.exports = router;