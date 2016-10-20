import { GraphQLString, GraphQLObjectType, GraphQLInt } from 'graphql'

import { familyType } from './familiesType'
import familiesData from '../data/families'

export const regionType = new GraphQLObjectType({
  name: 'Region',
  fields: () => ({
    name: { type: GraphQLString },
    area: { type: GraphQLInt },
    family: {
      type: familyType,
      resolve: (region) => familiesData.find( f => f.name === region.family)
    }
  })
})
