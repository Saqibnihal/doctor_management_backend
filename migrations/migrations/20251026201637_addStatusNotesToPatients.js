/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const hasStatus = await knex.schema.hasColumn("patients", "status");
  const hasNotes = await knex.schema.hasColumn("patients", "notes");

  return knex.schema.alterTable("patients", function (table) {
    if (!hasStatus) {
      table.string("status").defaultTo("Under Observation");
    }
    if (!hasNotes) {
      table.text("notes");
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const hasStatus = await knex.schema.hasColumn("patients", "status");
  const hasNotes = await knex.schema.hasColumn("patients", "notes");

  return knex.schema.alterTable("patients", function (table) {
    if (hasStatus) {
      table.dropColumn("status");
    }
    if (hasNotes) {
      table.dropColumn("notes");
    }
  });
};
