const express = require('express');
const router = express.Router();
const knex = require("../db/client");

router.get('/',(req, res) => {
    knex("clucks")
        .orderBy("createdAt")
        .then(data => {
            console.log(data);
            res.render("clucks/index", {clucks: data});
        });
});

router.get("/new", (req, res) => {
    res.render("clucks/new");
  });

router.post("/", (req, res) => {
    knex("clucks") 
      .insert({
        username: req.cookies.username,
        clucks: req.body.task
      })
      .returning("*") 
      .then(data => {
        res.redirect(`/clucks`);
      });
  });

module.exports = router;