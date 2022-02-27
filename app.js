const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const expressHbs = require("express-handlebars");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const path = require("path");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

//app.engine("handlebars", expressHbs()); //initialize the handle bars

//app.set('view engine','pug');//pug is built  in
//app.set('view engine','handlebars');//pug is built  in
app.set("view engine", "ejs"); //pug is built  in

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); //used to make css statically accessible

app.use((req,res,next)=>{
  User.findByPk(1).then(user=>{
    req.user=user;
    next();
  }).catch(err=>console.log(err));
})

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User,{constraints:true , onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
//Cart.hasMany(CartItem);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
sequelize
 //.sync({force:true})
 .sync()
  .then((result) => {
     return User.findByPk(1);
    //console.log(result);
  })
  .then(user=>{
    if (!user) {
      return User.create({
        name:"Moeez",
        email: "moeez@gmail.com"
     });

    }
    return user;
  })
  .then(user=>{
    return user.createCart();
    //console.log(user);
  })
  .then(cart=>{
    app.listen(3000);
    
  })
  .catch((err) => console.log(err));

