import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql'

import { houseType } from './housesType'
import housesData from '../data/houses'
import charactersData from '../data/characters'

export const characterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
      firstname: { type: GraphQLString },
      house: {
        type: houseType,
        resolve: (character) => housesData.houses.filter( h => h.name === character.house)[0]
      },
      husband: {
        type: characterType,
        resolve: (character) => charactersData.characters.filter( c => c.firstname === character.husband)[0]
      },
      wife: {
        type: characterType,
        resolve: (character) => charactersData.characters.filter( c => c.firstname === character.wife)[0]
      },
      brothers: {
        type: new GraphQLList(characterType),
        resolve: (character) => charactersData.characters.filter( c => character.brothers.indexOf(c.firstname) > -1)
      },
      sisters: {
        type: new GraphQLList(characterType),
        resolve: (character) => charactersData.characters.filter( c => character.sisters.indexOf(c.firstname) > -1)
      }
    })
})
