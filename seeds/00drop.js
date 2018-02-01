
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(() => knex('articles').del())
    .then(() => knex('users').del())
};
