import { GraphQLString, GraphQLObjectType, GraphQLInt } from 'graphql'

import { familyType } from './familiesType'
import familiesData from '../data/families'

export const regionType = new GraphQLObjectType({
  name: 'Region',
  fields: () => ({
    family: {
      type: familyType,
      resolve: (region) => familiesData.filter( f => f.name === region.family)[0]
    },
    name: { type: GraphQLString },
    area: { type: GraphQLInt }
  })
})
