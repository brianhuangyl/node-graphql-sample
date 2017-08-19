module.exports.up = async db => {
  await db.schema.createTable('products', table => {
    table.increments();
    table.float('price');
    table.string('name', 200);
    table.text('description');
    table.string('image_url', 200);
    table.timestamps(false, true);
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('products');
};

module.exports.configuration = { transaction: true };
