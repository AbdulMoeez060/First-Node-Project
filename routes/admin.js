const express= require('express');

const path= require('path');

//const rootDir= require('../utils/paths')
const adminController = require('../controllers/admin')
const router = express.Router();



router.get('/add-product',adminController.getAddProduct);

router.get('/products',adminController.getProducts);


router.post('/add-product',adminController.postAddProduct);



module.exports = router;
