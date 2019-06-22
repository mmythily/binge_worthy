
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Etta', email: 'etta@gmail.com', password: 'cat'},
        {id: 2, name: 'Jack', email: 'jack@gmail.com', password: 'dog'},
        {id: 3, name: 'Sarah', email: 'sarah@hotmail.com', password: 'dog'}
      ]);
    });
};
