"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/my-list", (req, res) => {
    knex
      .select("*")
      .from("lists")
      .then((listItems) => {
        res.json(listItems);
      });
  });

  return router;
}