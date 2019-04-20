/**
 * Tryggvi Bragason - 2019
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType,
  //  GraphQLID as ID,
  GraphQLString,
  //  GraphQLNonNull as NonNull,
  GraphQLInt,
} from 'graphql';

const QuestionType = new GraphQLObjectType({
  name: 'Question',
  fields: {
    qID: { type: GraphQLInt },
    sID: { type: GraphQLInt },
    questionText: { type: GraphQLString },
  },
});

export default QuestionType;
