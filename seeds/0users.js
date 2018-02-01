exports.seed = function(knex, Promise){

      return knex('users').insert([
        {
          id: 1,
          first_name: 'Derek',
          last_name: 'Rodrigues',
          email: 'ashley@gmail.com',
          password: '$2a$06$EGlAZ919ENeiA8WrvMeSjOAVBADAgG4RtZo9PqltW7px/IMx8weq2',
          rating: 2,
          is_admin: true,
          total_views: 90,
          total_likes: 1,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          first_name: 'Brent',
          last_name: 'Schroder',
          email: 'schroder.brent@gmail.com',
          password: '$2a$06$AlbxjZfGH6l4ERxFRiYWT.l1rBKv/FpKu3CAPzQR9mgzKtmpob4Xy',
          rating: 10,
          is_admin: false,
          total_views: 78,
          total_likes: 10,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 3,
          first_name: 'Eddie',
          last_name: 'Marovich',
          email: 'eddie@gmail.com',
          password: '$2a$06$MM6SGUYPoENOO8egtbk2Z.d/wLxiMxiiX3CE6WHdXEiZxkjQ2o6NO',
          rating: 10,
          is_admin: false,
          total_views: 78,
          total_likes: 10,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 4,
          first_name: 'Rob',
          last_name: 'Quan',
          email: 'rob@gmail.com',
          password: '$2a$06$916akdvLX9.fu.lEfNFQAebebAYL2yiTj8uUkQoRHXZcWTTrm7S7i',
          rating: 10,
          is_admin: false,
          total_views: 78,
          total_likes: 10,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 5,
          first_name: 'Olivia',
          last_name: 'Burgener',
          email: 'oliva@gmail.com',
          password: '$2a$06$haDSOqcL3wk/wKlTdXmf9Oo4eQkY7ZVUoFozKZmZOO75JhUFyNZEm',
          rating: 10,
          is_admin: false,
          total_views: 78,
          total_likes: 10,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 6,
          first_name: 'Tim',
          last_name: 'Jackson',
          email: 'tim@gmail.com',
          password: '$2a$06$L4jQeVEgouyqg6.6EOXBL.nwG6rRq.X6CQtsEHwN.3b65ZWgjn8bC',
          rating: 10,
          is_admin: false,
          total_views: 78,
          total_likes: 10,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }
      ])

    .then(function(){
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
    })
}
