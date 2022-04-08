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
  req.session.isLoggedIn = true; //we use the sessuin obect made by session middleware and we can add any value like isloggedin
  //this session is saved in browser so no matter which request we send in the logged in browser the session will be active and cookie will be available
  res.redirect("/");
};
