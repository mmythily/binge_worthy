
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.string('email', 255);
    t.string('password', 255);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('email');
    t.dropColumn('password');
  })  
};
