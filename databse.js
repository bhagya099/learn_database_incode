const pgp = require('pg-promise')();

const cn = `postgres://postgres:@localhost:5432/incode5_fk`;

const db = pgp(cn);

module.exports = db;