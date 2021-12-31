const express= require('express');

const path= require('path');//For joining paths
const rootDir= require('../utils/paths')

const shopsController= require("../controllers/shop");
const router = express.Router();


router.get('/',shopsController.getIndex);

router.get('/products',shopsController.getProducts);
router.get('/cart',shopsController.getCart);
router.get('/checkout',shopsController.getCheckout);



module.exports = router;