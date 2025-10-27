/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("patients", function (table) {
    table.uuid("id").primary();
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone");
    table
      .uuid("assigned_doctor_id")
      .references("id")
      .inTable("doctors")
      .onDelete("SET NULL");
    table.string("status").defaultTo("Under Observation");
    table.text("notes");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("patients");
};
