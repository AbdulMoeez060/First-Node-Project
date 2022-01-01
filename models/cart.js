const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(require.main.filename),
    "data",
    "cart.json"
  );

module.exports= class Cart{
    // constructor(){
    //     this.product=[];
    //     this.totalPrice=0;
    // }
    static addProduct(id,productPrice){

        //fetch previous items in Cart
        fs.readFile(p,(err,filecontent)=>{

            let cart={products: [] , totalPrice:0};

            if (!err) {
                cart=JSON.parse(filecontent);
            }
            
        });
        //analyze the cart to find existing products 
        const existingProduct = cart.product.find(prod => prod.id===id);
        let updatedProduct;
        //add new items / increase the quantity of existing

        if (existingProduct) {
            updatedProduct = {...existingProduct};
            updatedProduct.qty=updatedProduct.qty+1;
        }
        else{
            updatedProduct = {id: id,qty:1};

        }
        cart.totalPrice = cart.totalPrice+productPrice;


    }
    
}