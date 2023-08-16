/* eslint-disable no-console */

// messages-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get("knexClient");
  const tableName = "messages";
  db.schema.hasTable(tableName).then((exists) => {
    if (!exists) {
      db.schema
        .createTable(tableName, (table) => {
          table.increments("id").primary();
          table.integer("userId").unsigned();
          table.foreign("userId").references("users.id");
          table.string("messageBody");
          table.string("dateCreated");
          table.string("dateUpdated");
          table.string("timeCreated");
          table.string("timeUpdated");
          // table.timestamps(false, true); timestamps throwing bad request error on update
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch((e) => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
