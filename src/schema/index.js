import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { products, createProduct, updateProduct, deleteProduct } from './Product';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      products
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createProduct,
      updateProduct,
      deleteProduct
    },
  })
});
