exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.integer('rating').notNullable().defaultsTo(0)
    table.boolean('is_admin').notNullable().defaultsTo(false)
    table.integer('total_views').notNullable().defaultsTo(0)
    table.integer('total_likes').notNullable().defaultsTo(0)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
