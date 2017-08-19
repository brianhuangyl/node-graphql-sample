import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} from 'graphql';

const QueryType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'The id of the product.'
    },
    price: {
      type: GraphQLFloat,
      description: 'The price of the product.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the product.'
    },
    description: {
      type: GraphQLString,
      description: 'The description of the product.'
    },
    imageUrl: {
      type: GraphQLString,
      description: 'The imageUrl of the product.',
      resolve(parent) {
        return parent.image_url;
      }
    }
  }
});

const InputType = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: {
    price: { type: GraphQLFloat },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString }
  }
})

export default { QueryType, InputType }
