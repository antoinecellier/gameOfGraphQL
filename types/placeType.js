import { GraphQLUnionType } from 'graphql'

import { strongholdType } from './strongholdType'
import { regionType } from './regionType'

export const placeType = new GraphQLUnionType({
  name: 'PlaceType',
  types: [ strongholdType, regionType ],
  resolveType: (data) => {
    if(data.area) {
      return regionType
    }

    if(data.builder) {
      return strongholdType
    }
  }
})
