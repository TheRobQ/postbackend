exports.seed = function(knex, Promise){

    return knex('likes').insert([
      {
        id: 1,
        user_id: 1,
        article_id: 1,
        liked: true,
      }, {
        id: 2,
        user_id: 2,
        article_id: 2,
        liked: false,
      }
    ])

  .then(function(){
  return knex.raw("SELECT setval('likes_id_seq', (SELECT MAX(id) FROM likes))")
  })
}
