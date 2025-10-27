/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("patients", function (table) {
    table.string("status").defaultTo("Under Observation");
    table.text("notes");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("patients", function (table) {
    table.dropColumn("status");
    table.dropColumn("notes");
  });
};
