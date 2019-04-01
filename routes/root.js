const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.cookies.username) {
    res.render("index", { username:req.cookies.username });
  } else {
    res.render("login", {username: false});
  }
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post("/", (req, res) => {
  res.cookie("username", req.body.username, { maxAge: COOKIE_MAX_AGE });
  res.redirect("/clucks");
});

router.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

module.exports = router;
