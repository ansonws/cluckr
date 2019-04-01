const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/", (req, res) => {
  if (req.cookies.username) {
    knex("clucks")
      .where({
          username: req.cookies.username
      })
      .orderBy("createdAt", "DESC")
      .then(data => {
          res.render("clucks/index", {
              clucks: data, 
              username: req.cookies.username
          });
      });
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
