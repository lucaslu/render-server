/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// knex migrate:latest -> runs up command
exports.up = function (knex) {
  return knex.schema.createTable("educators", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("position").notNullable().defaultTo("Educator");
    table.string("email").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// knex migrate:rollback -> runs down command
exports.down = function (knex) {
  return knex.schema.dropTable("educators");
};
