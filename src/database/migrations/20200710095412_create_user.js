
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.uuid('id').primary()
        table.string('name').notNullable(),
        table.string('email').unique().notNullable(),
        table.string('url_image_profile')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
