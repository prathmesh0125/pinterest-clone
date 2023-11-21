var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const upload = require("./multer");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res) {
  // console.log(req.flash("error"));
  res.render("login", { error: req.flash("error") });
});

router.get("/feed", function (req, res) {
  res.render("feed");
});
router.post("/upload", isLoggedIn, upload.single("file"), async function (req, res) {
  if (!req.file) {
    return res.status(404).send("no files were upload");
  }
  // res.send("file upload succesfully");
  const user=await userModel.findOne({username:req.session.passport.user});

  const postdata=await postModel.create({
    image:req.file.filename,
    postText:req.body.filecaption,
    user:user._id
  })

  user.posts.push(postdata._id);
  await user.save();
  res.redirect("/profile")

});

router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  }).populate("posts")
  // console.log(user)
  res.render("profile", { user });
});

router.post("/register", function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({
    username,
    email,
    fullname,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
router.use((req, res, next) => {
  res.status(404).render("404");
});

module.exports = router;
