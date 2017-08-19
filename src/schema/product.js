import ProductType from './ProductType';
import productModel from '../models/product';
import {
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';


export const products = {
  type: new GraphQLList(ProductType.QueryType),
  args: {
    id: { type: GraphQLString },
    first: { type: GraphQLInt },
    after: { type: GraphQLInt },
  },
  resolve(source, args) {
    return productModel.get(args);
  }
};

export const createProduct = {
  type: ProductType.QueryType,
  args: {
    input: { type: ProductType.InputType }
  },
  async resolve(source, {input}) {
    const productId = await productModel.create(input);
    const data = await productModel.get({ id: productId });
    return data[0];
  }
};

export const updateProduct = {
  type: ProductType.QueryType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    input: { type: ProductType.InputType }
  },
  async resolve(source, { id, input }) {
    const productId = await productModel.update(id, input);
    const data = await productModel.get({ id: productId });
    return data[0];
  }
};

export const deleteProduct = {
  type: ProductType.QueryType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(source, { id }) {
    await productModel.del(id);
    return { id: id };
  }
};
