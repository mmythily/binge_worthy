
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then( () => {
      return knex('users').del();
    })
    .then( () => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Etta', email: 'etta@gmail.com', password: 'cat'},
        {id: 2, name: 'Jack', email: 'jack@gmail.com', password: 'dog'},
        {id: 3, name: 'Sarah', email: 'sarah@hotmail.com', password: 'dog'}
      ]);
    })
    .then( () => {
      // Insert lists entries
      return knex('lists').insert([
        {user_id: 3, item: 'The Godfather', category: 'Movie'},
        {user_id: 1, item: 'North of Brooklyn', category: 'Restaurant'},
        {user_id: 1, item: 'Akane Sushi', category: 'Restaurant'},
        {user_id: 3, item: 'Bossypants', category: 'Book'},
        {user_id: 2, item: 'Boston Pizza', category: 'Restaurant'},
        {user_id: 2, item: 'The Avengers', category: 'Movie'}
      ]);
    });
};


