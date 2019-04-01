const express = require('express');
const router = express.Router();
const knex = require("../db/client");

router.get('/',(req, res) => {
    if(req.cookies.username) {
        knex("clucks")
            .orderBy("createdAt", "DESC")
            .then(data => {
                console.log(data);
                console.log("YOUR FORM WAS GET");
                res.render("clucks/index", {clucks: data});
            });
    } else {
        res.render("login")
    }
});

router.get("/new", (req, res) => {
    if(req.cookies.username) {
        res.render("clucks/new");
    } else {
        res.render("login")
    }
  });

router.post("/", (req, res) => {
    console.log("FINALLY YOU POST");
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
