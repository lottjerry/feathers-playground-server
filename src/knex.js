const knex = require("knex");
const dotenv = require("dotenv");
dotenv.config();

const HOST = process.env.HOST
const PORT = process.env.PORT
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE

module.exports = function (app) {
  const db = require("knex")({
    client: "mysql2",
    connection: {
      host: HOST,
      port: PORT,
      user: USERNAME,
      password: PASSWORD,
      database: DATABASE,
    },
  });

  app.set("knexClient", db);
};
