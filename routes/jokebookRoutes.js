"use strict";
const express = require("express");
const router = express.Router();
const jokebookController = require('../controllers/jokebookController');

router.get("/categories", jokebookController.getAllCategories);
router.get("/category/:category", jokebookController.getJokesByCategory);
router.get("/random/", jokebookController.getRandomJoke);
router.post("/joke/add", jokebookController.addJoke);
module.exports = router;
