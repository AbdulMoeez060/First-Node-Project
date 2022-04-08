exports.getLogin = (req, res, next) => {
  const isLoggedIn =
    req.get("Cookie").split(";")[4].trim().split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true"); //cookies can used to track how long user has been on te site and we can send cookies to other pages to track user we can also configure cookies like when will it expire

  res.redirect("/");
};
