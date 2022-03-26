const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");
//const expressHbs = require("express-handlebars");
const path = require("path");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");

const app = express();

//app.engine("handlebars", expressHbs()); //initialize the handle bars

//app.set('view engine','pug');//pug is built  in
//app.set('view engine','handlebars');//pug is built  in
app.set("view engine", "ejs"); //pug is built  in

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); //used to make css statically accessible

app.use((req, res, next) => {
  User.findById("6221fa99dac3edaf663e5fbf")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});


app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(authRoutes);


app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://moeez2:moeez@cluster0.drot1.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then(user=>{
      if (!user) {
        const user = new User({
          name: "Moeez",
          email: "moeez@gmail.com",
          cart: { items: [] },
        });
        user.save();
        
      }
    })
    app.listen(3000);
  })
  .catch((err) => console.log(err));
