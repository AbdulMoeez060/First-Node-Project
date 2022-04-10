const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //const isLoggedIn =
  //  req.get("Cookie").split(";")[4].trim().split("=")[1] === "true";
  //console.log(req.session.isLoggedIn)
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //res.setHeader("Set-Cookie", "loggedIn=true"); //cookies can used to track how long user has been on te site and we can send cookies to other pages to track user we can also configure cookies like when will it expire
   //we use the sessuin obect made by session middleware and we can add any value like isloggedin
  //this session is saved in browser so no matter which request we send in the logged in browser the session will be active and cookie will be available
  //this session is stored in memory and its ok for development but in prod we have to store in db
  //we are using mongo store
  
  User.findById("6221fa99dac3edaf663e5fbf")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;// make a new session cookie named user in express session
      //console.log(req.session.user)
      res.redirect("/");
      
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req,res,next)=>{
  req.session.destroy((err)=>{//destroy the session when logout
    console.log(err)
    res.redirect('/');
  });
}