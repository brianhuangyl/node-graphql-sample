import fixtureFactory from 'fixture-factory';

const productDataModel = {
  price: 'commerce.price',
  name: 'commerce.productName',
  description: 'lorem.sentence',
  imageUrl: 'internet.avatar'
};

fixtureFactory.register('product', productDataModel);

export default fixtureFactory
