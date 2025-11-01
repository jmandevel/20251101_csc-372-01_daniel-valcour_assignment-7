"use strict";
const pool = require('../models/db');

async function getAllCategories() {
    const queryText = "SELECT DISTINCT category FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getJokesByCategory(category, limit) {
    const queryText = 
        limit ? "SELECT * FROM jokes WHERE category = $1 LIMIT $2"
        : "SELECT * FROM jokes WHERE category = $1";
    const values = limit ? [category, limit] : [category];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function getRandomJoke() {
    let queryText = "SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1";
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addJoke(category, setup, delivery) {
    let queryText = "INSERT INTO JOKES (category, setup, delivery) VALUES ($1, $2, $3)";
    let values = [category, setup, delivery];
    const result = await pool.query(queryText, values);
    return result.rows;
}

module.exports = {
    getAllCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};