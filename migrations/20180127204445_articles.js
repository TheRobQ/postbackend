exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.string('title').notNullable()
    table.string('summary').notNullable()
    table.string('body', 200000).notNullable()
    table.string('image_url').notNullable()
    table.string('sport').notNullable()
    table.integer('views').notNullable().defaultsTo(0)
    table.integer('likes').notNullable().defaultsTo(0)
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
};
