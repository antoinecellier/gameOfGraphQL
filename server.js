import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import graphqlHTTP from 'express-graphql'
import express from 'express'

import housesData from './data/houses'
import charactersData from'./data/characters'

import { characterType } from './types/charactersType'
import { houseType } from './types/housesType'
import { genderType } from './types/genderType'

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
            return housesData.filter(h => h.name === name)
          }
          return housesData
        }
      },
      characters: {
        type: new GraphQLList(characterType),
        args: {
          firstname: { type: GraphQLString }
        },
        resolve: (_, { firstname }) => {
          if(firstname) {
            return charactersData.filter(c => c.firstname === firstname)
          }
          return charactersData
        }
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createCharacter: {
        type: characterType,
        args: {
          firstname: { type: GraphQLString },
          house: { type: GraphQLString },
          husband: { type: GraphQLString },
          wife: { type: GraphQLString },
          brothers: { type: new GraphQLList(GraphQLString) },
          sisters: { type: new GraphQLList(GraphQLString) },
          gender: { type: genderType }
        },
        resolve: (_, character) => {
          charactersData.push(character)
          return character
        }
      }
    })
  })
});

express()
  .use('/graphql', graphqlHTTP({ schema , pretty: true, graphiql: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
