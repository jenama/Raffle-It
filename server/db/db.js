const pgp = require('pg-promise')({});
const cn = process.env.DATABASE_URL || "postgres://localhost:5432/rafflesit";
const db = pgp(cn)
module.exports = db