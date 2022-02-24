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
            //analyze the cart to find existing products 
            const existingProductIndex = cart.products.findIndex(prod => prod.id===id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add new items / increase the quantity of existing

            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty=updatedProduct.qty+1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }
            else{
                updatedProduct = {id: id,qty:1};
                cart.products = [...cart.products,updatedProduct];

            }
            cart.totalPrice = cart.totalPrice+ +productPrice;
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })
            
        });
        

    }
    
    static deleteProduct(id,productPrice){
        fs.readFile(p,(err,filecontent)=>{
            if (err) {
                return;
            }
            const updatedCart = {...JSON.parse(filecontent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice-productPrice * productQty;
            fs.writeFile(p,JSON.stringify(updatedCart),(err)=>{
                console.log(err);
            })
        });
    };

}