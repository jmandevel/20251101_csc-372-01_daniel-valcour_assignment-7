"use strict";

const baseURL = "http://localhost:3000/jokebook";

async function fetchRandomJoke() {
    const out = document.getElementById("random-joke-out");
    out.textContent = "Loading...";
    try {
        const res = await fetch(`${baseURL}/random`);
        const joke = await res.json();
        out.textContent = `${joke.category}: ${joke.setup} ${joke.delivery}`;    
    } catch (err) {
        out.textContent = "Error reading random joke.";
        console.error(err);
    }
}

async function fetchCategories() {
    const out = document.getElementById("categories-out");
    out.textContent = "Loading categories...";
    try {
        const res = await fetch(`${baseURL}/categories`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const categories = await res.json();
        if (categories.length === 0) {
            out.textContent = "No categories found.";
        } else {
            out.textContent = categories.map(c => c.name || c.category || c).join(", ");
        }
    } catch (err) {
        out.textContent = "Error fetching categories.";
        console.error(err);
    }
}

async function fetchJokesByCategory(category, limit) {
    const out = document.getElementById("jokes-of-category-out");
    out.textContent = "Loading jokes...";
    try {
        let url = `${baseURL}/category/${encodeURIComponent(category)}`;
        if (limit) {
            url += `?limit=${encodeURIComponent(limit)}`;
        }
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const jokes = await res.json();
        if (jokes.length === 0) {
            out.textContent = `No jokes found for category "${category}"`;
        } else {
            out.textContent = "";
            for (const joke of jokes) {
                out.textContent += `${joke.category}: ${joke.setup} ${joke.delivery}, `;
            }
        }
    } catch (err) {
        out.textContent = "Error fetching jokes.";
        console.error(err);
    }
}

document.getElementById("add-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const category = this.category.value.trim();
    const setup = this.setup.value.trim();
    const delivery = this.delivery.value.trim();
    const out = document.getElementById("jokes-of-category-out");

    if (!category || !setup || !delivery) return;

    try {
        const res = await fetch(`${baseURL}/joke/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category, setup, delivery })
        });

        // Log backend response for debugging
        const data = await res.json();
        console.log("Add joke response:", data);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        this.reset(); // Clear the form
        fetchCategories(); // Refresh category list
    } catch (err) {
        out.textContent = "Error adding new joke.";
        console.error(err);
    }
});
document.getElementById("category-jokes-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const category = this.category.value.trim();
    const limit = this.limit.value.trim();
    if (category) {
        fetchJokesByCategory(category, limit);
    }
});
document.getElementById("lookup-categories").addEventListener("click", fetchCategories);
document.getElementById("random-joke-button").addEventListener("click", fetchRandomJoke);

fetchRandomJoke();
fetchCategories();