import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'

import graphqlHTTP from 'express-graphql'
import express from 'express'

import familiesData from './data/families'
import charactersData from'./data/characters'
import regionData from'./data/region'
import strongholdData from'./data/stronghold'

import { characterType } from './types/charactersType'
import { familyType } from './types/familiesType'
import { genderType } from './types/genderType'
import { placeType } from './types/placeType'
import { regionType } from './types/regionType'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      families: {
        type: new GraphQLList(familyType),
        args: {
          name: { type: GraphQLString }
        },
        resolve: (_, { name }) => {
          return name ? familiesData.filter(h => h.name === name) : familiesData
        }
      },
      characters: {
        type: new GraphQLList(characterType),
        args: {
          firstname: { type: GraphQLString }
        },
        resolve: (_, { firstname }) => {
          return firstname ? charactersData.filter(c => c.firstname === firstname) : charactersData
        }
      },
      places: {
        type: new GraphQLList(placeType),
        args: {
          namePlace: { type : GraphQLString }
        },
        resolve: (_, { namePlace }) => {
          const places = regionData.concat(strongholdData)

          return namePlace ? places.filter(p =>  p.name.indexOf(namePlace) !== -1) : places
        }
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createRegion: {
        type: regionType,
        args: {
          family: { type: new GraphQLNonNull(GraphQLString) },
          name: { type: new GraphQLNonNull(GraphQLString) },
          area: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: (_, region) => {
          regionData.push(region)
          return region
        }
      },
      createCharacter: {
        type: characterType,
        args: {
          firstname: { type: new GraphQLNonNull(GraphQLString) },
          family: { type: new GraphQLNonNull(GraphQLString) },
          husband: { type: new GraphQLNonNull(GraphQLString) },
          wife: { type: new GraphQLNonNull(GraphQLString) },
          brothers: { type: new GraphQLList(GraphQLString) },
          sisters: { type: new GraphQLList(GraphQLString) },
          gender: { type: new GraphQLNonNull(genderType) }
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
  .use('/graphql', graphqlHTTP(request => ({ schema, context: request, pretty: true, graphiql: true, rootValue: {} })))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
