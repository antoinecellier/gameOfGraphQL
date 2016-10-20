import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql'

import { familyType } from './familiesType'
import { genderType } from './genderType'
import familiesData from '../data/families'
import charactersData from '../data/characters'

export const characterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
      firstname: { type: GraphQLString },
      family: {
        type: familyType,
        resolve: (character) => familiesData.find( f => f.name === character.family)
      },
      husband: {
        type: characterType,
        resolve: (character) => charactersData.find( c => c.firstname === character.husband)
      },
      wife: {
        type: characterType,
        resolve: (character) => charactersData.find( c => c.firstname === character.wife)
      },
      brothers: {
        type: new GraphQLList(characterType),
        resolve: (character) => charactersData.filter( c => character.brothers.indexOf(c.firstname) > -1)
      },
      sisters: {
        type: new GraphQLList(characterType),
        resolve: (character) => charactersData.filter( c => character.sisters.indexOf(c.firstname) > -1)
      },
      gender: {
        type: genderType
      }
    })
})
