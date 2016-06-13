import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql'

import { strongholdType } from './strongholdType'
import strongholdData from '../data/stronghold'

import { regionType } from './regionType'
import regionData from '../data/region'

import { characterType } from './charactersType'
import charactersData from '../data/characters'

export const familyType = new GraphQLObjectType({
  name: 'Family',
  fields: () => ({
    name: { type: GraphQLString },
    stronghold: {
      name: 'Stronghold',
      type: strongholdType,
      resolve: (family) =>  strongholdData.filter(s => s.family === family.name)[0]
    },
    region: {
      type: regionType,
      resolve: (family) =>  regionData.filter(r => r.family === family.name)[0]
    },
    motto: { type: GraphQLString },
    members: {
      type: new GraphQLList(characterType),
      args: {
        name: { type : GraphQLString }
      },
      resolve: (family, { name }) => {
        if(name) {
          return charactersData.filter(c => c.family === family.name && c.firstname.indexOf(name) !== -1)
        }
        return charactersData.filter(c => c.family === family.name)
      }
    }
  })
})
