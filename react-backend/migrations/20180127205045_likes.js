exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', table => {
    table.increments('id')
    table.integer('user_id').notNullable()
    table.integer('article_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.foreign('article_id').references('articles.id').onDelete('CASCADE')
    table.boolean('liked').notNullable().defaultsTo(false)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes')
};
