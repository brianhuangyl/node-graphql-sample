import _ from 'lodash';
import request from 'supertest-as-promised';
import { stringify } from 'querystring';
import factory from '../fixtures/factory';
const server = require(`${SRC}/server`).default;

function urlString(urlParams?: ?{[param: string]: mixed}) {
  let string = '/graphql';
  if (urlParams) {
    string += ('?' + stringify(urlParams));
  }
  return string;
}

function unwrapResposeObject(string) {
  return JSON.parse(string).data;
}

describe('Http requests', () => {
  let app = null
  before(() => {
    app = server.create();
  });

  function buildFakeProduct() {
    const product = factory.generateOne('product');
    product.price = parseFloat(product.price);
    return product;
  }

  function buildInputString({price, name, description, imageUrl}) {
    return `price: ${price}  name: "${name}"  description: "${description}" imageUrl: "${imageUrl}"`
  }

  describe('product', () => {
    let fakeProduct = null;
    let createdProduct = null;

    beforeEach(async () => {
      fakeProduct = buildFakeProduct();
      const result = await request(app).post('/graphql').send({query: `mutation { createProduct(input: {
        ${buildInputString(fakeProduct)}
      }){id name description price imageUrl}}`})
      createdProduct = unwrapResposeObject(result.text).createProduct;
    });

    it('should create a product', () => {
      createdProduct.should.eql(_.extend({id: createdProduct.id}, fakeProduct));
    });

    it('should get a product by id', async () => {
      const id = createdProduct.id;
      const getReponse = await request(app).get(urlString( { query: `{ products(id: "${id}") { id name description price imageUrl }}` }));
      const product = unwrapResposeObject(getReponse.text).products[0];
      product.should.eql(_.extend({id: id}, fakeProduct));
    });

    it('should fetch a range of products', async () => {
      const getReponse = await request(app).get(urlString({ query: '{ products(first: 2, after: 0) { id name price imageUrl}}' }));
      const products = unwrapResposeObject(getReponse.text).products;
      products.length.should.equal(2);
    });

    it('should update a product', async () => {
      const id = createdProduct.id;
      const fakeUpdatedProduct = buildFakeProduct();
      const response = await request(app).post('/graphql').send({query: `mutation { updateProduct(id: "${id}", input: { ${buildInputString(fakeUpdatedProduct)} }){ price, name, description, imageUrl }}`})
      const product = unwrapResposeObject(response.text).updateProduct;
      product.should.eql(fakeUpdatedProduct);
    })

    it('should delete a product', async () => {
      const id = createdProduct.id;
      const response = await request(app).post('/graphql').send({query: `mutation { deleteProduct(id: "${id}"){id}}`})
      const product = unwrapResposeObject(response.text).deleteProduct;
      product.id.should.eql(id);
    })
  })
});
