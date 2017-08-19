const faker = require('faker');

module.exports.seed = async db => {
  // Create 10 random products (as an example)
  const products = Array.from({ length: 10 }).map(() => ({
    price: faker.commerce.price(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    image_url: faker.internet.avatar()
  }));

  await Promise.all(
    products.map(product =>
      db
        .table('products')
        .insert(product)
        .returning('id')
        .then(rows => db.table('products').where('id', '=', rows[0]).first('*'))
        .then(row => Object.assign(product, row)),
    ),
  );
};
