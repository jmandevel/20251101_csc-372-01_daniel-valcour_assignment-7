"use strict";
const model = require('../models/jokebookModel');

async function getAllCategories(req, res) {
    try {
        const categories = await model.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function getJokesByCategory(req, res) {
    const { category } = req.params;
    try {
        const jokes = await model.getJokesByCategory(category);
        res.json(jokes);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function getRandomJoke(req, res) {
    const { category } = req.params;
    try {
        const joke = await model.getRandomJoke();
        res.json(joke);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function addJoke(req, res) {
    const { category, setup, delivery } = req.params;
    try {
        const joke = await model.addJoke(category, setup, delivery);
        res.json(joke);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    getAllCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};