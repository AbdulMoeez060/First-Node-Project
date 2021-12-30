const express = require("express");
const bodyParser= require('body-parser');

const adminRoutes = require('./routes/admin');
const expressHbs = require('express-handlebars');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const path = require("path");

const app = express();

app.engine('handlebars',expressHbs());//initialize the handle bars

//app.set('view engine','pug');//pug is built  in
//app.set('view engine','handlebars');//pug is built  in
app.set('view engine','ejs');//pug is built  in

app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));//used to make css statically accessible

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
