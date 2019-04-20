/**
 * Tryggvi Bragason - 2019
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  //  GraphQLID as ID,
  GraphQLString as StringType,
  //  GraphQLNonNull as NonNull,
  GraphQLInt as IntegerType,
} from 'graphql';

const QuestionType = new ObjectType({
  name: 'Question',
  fields: {
    sID: { type: IntegerType },
    questiontext: { type: StringType },
  },
});

export default QuestionType;
