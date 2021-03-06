const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); // returns a store constructer func

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");
//const expressHbs = require("express-handlebars");
const path = require("path");
const User = require("./models/user");
const MONGODB_URI =
  "mongodb+srv://moeez2:moeez@cluster0.drot1.mongodb.net/shop?retryWrites=true&w=majority";
const { default: mongoose } = require("mongoose");

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions", //parameters
});

//app.engine("handlebars", expressHbs()); //initialize the handle bars

//app.set('view engine','pug');//pug is built  in
//app.set('view engine','handlebars');//pug is built  in
app.set("view engine", "ejs"); //pug is built  in

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public"))); //used to make css statically accessible
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store, //alwayes use session store like this mongostore we can also store our cart in session
  }) // we get the user n auth.js but it only gets the info not the whole user with fuctions like 11
);

//Removing this and adding user when one logs in in auth.js controller and the adding again to get the user methods
app.use((req, res, next) => {//11 this gets whole user with methods with every request
  
  if (!req.session.user) {
    return next;
  }

  User.findById(req.session.user)
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
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Moeez",
          email: "moeez@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));
