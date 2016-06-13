import { GraphQLString, GraphQLObjectType } from 'graphql'


export const strongholdType = new GraphQLObjectType({
  name: 'Stronghold',
  fields: () => ({
    name: { type: GraphQLString },
    builder: { type: GraphQLString }
  })
})
