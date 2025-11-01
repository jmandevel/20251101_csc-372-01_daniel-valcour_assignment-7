-- Run this once in the neondb to create the initial tables.
CREATE TABLE jokes (
    id SERIAL PRIMARY KEY,
    categroy TEXT NOT NULL,
    setup TEXT NOT NULL,
    delivery TEXT NOT NULL
);