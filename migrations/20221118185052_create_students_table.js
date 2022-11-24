/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("students", (table) => {
    table.uuid("id").primary(); // primary key for student row
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("course").notNullable();
    table
      .uuid("educator_id") // educator_id is the foreign key
      .notNullable()
      .references("id") // refers to 'id' column in educators table
      .inTable("educators")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
