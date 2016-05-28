import { GraphQLString, GraphQLEnumType, GraphQLList } from 'graphql'

export const genderType = new GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: { value: 'male' },
    FEMALE: { value: 'female' }
  }
})
