function up(knex) {
  return knex.schema.createTable('posts', (t) => {
    t.uuid('id').primary();
    t.uuid('user_id').index();
    t.text('title').unique();
    t.text('body');
    t.timestamps();
  });
}

function down(knex) {
  return knex.schema.dropTable('posts');
}

module.exports = {up, down};
