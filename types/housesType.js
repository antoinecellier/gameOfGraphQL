import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql'

import { characterType } from './charactersType'
import charactersData from '../data/characters'

export const houseType = new GraphQLObjectType({
  name: 'House',
  fields: () => ({
    name: { type: GraphQLString },
    stronghold: { type: GraphQLString },
    motto: { type: GraphQLString },
    members: {
      type: new GraphQLList(characterType),
      resolve: (house) => charactersData.filter(c => c.house === house.name)
    }
  })
})
