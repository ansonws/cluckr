const express = require('express');
const router = express.Router();
const knex = require("../db/client");
const dateConverter = require("../custom_modules/dateConverter");
const trending = require("../custom_modules/trending");

router.get('/',(req, res) => {
    if (req.cookies.username) {
        knex("clucks")
            .where({
                username: req.cookies.username
            })
            .orderBy("createdAt", "DESC")
            .then(data => {
                console.log(trending());
                res.render("clucks/index", {
                    clucks: data, 
                    username: req.cookies.username,
                    dateConverter: dateConverter,
                    trending: trending
                });
            });
    } else {
        res.render("login", {username: false});
    }
});

router.get("/new", (req, res) => {
    if (req.cookies.username) {
        res.render("clucks/new", { username: req.cookies.username });
    } else {
        res.render("login", {username: false});
    }
  });

router.post("/", (req, res) => {
    knex() 
      .insert({
        username: req.cookies.username,
        content: req.body.content,
        image_url: req.body.image_url 
      })
      .into("clucks")
      .returning("*") 
      .then(data => {
        res.redirect(`/clucks`);
      });
  });

module.exports = router;
