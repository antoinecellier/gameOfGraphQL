import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import graphqlHTTP from 'express-graphql'
import express from 'express'

import housesData from './data/houses'
import charactersData from'./data/characters'

import { characterType } from './types/charactersType'
import { houseType } from './types/housesType'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      houses: {
        type: new GraphQLList(houseType),
        args: {
          name: { type: GraphQLString }
        },
        resolve: (_, { name }) => {
          if(name) {
            return housesData.houses.filter(h => h.name === name)
          }
          return housesData.houses
        }
      },
      characters: {
        type: new GraphQLList(characterType),
        args: {
          firstname: { type: GraphQLString }
        },
        resolve: (_, { firstname }) => {
          if(firstname) {
            return charactersData.characters.filter(c => c.firstname === firstname)
          }
          return charactersData.characters
        }
      }
    })
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema , pretty: true, graphiql: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
