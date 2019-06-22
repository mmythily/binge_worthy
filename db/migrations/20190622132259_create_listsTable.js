
exports.up = function (knex, Promise) {
  return knex.schema.createTable('lists', function (table) {
    table.increments('id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.string('item').notNullable();
    table.string('category');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('lists');
};
