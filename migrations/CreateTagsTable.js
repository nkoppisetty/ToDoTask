function up(knex) {
  return knex.schema.createTable('tags', (t) => {
    t.uuid('id').primary();
    t.uuid('user_id').index();
    t.text('name').unique();
    t.timestamps();
  });
}

function down(knex) {
  return knex.schema.dropTable('tags');
}

module.exports = {up, down};
