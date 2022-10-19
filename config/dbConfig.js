const client = require("knex")({
  client: "cockroachdb",
  connection: process.env.CONNECTION_URI,
});

module.exports = client