import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const AnswerType = new GraphQLObjectType({
  name: 'Answers',
  fields: {
    aID: { type: GraphQLInt },
    whatUser: { type: GraphQLString },
    questionText: { type: GraphQLString },
    questionAns: { type: GraphQLString },
    sID: { type: GraphQLInt },
  },
});

export default AnswerType;
