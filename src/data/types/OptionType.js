/**
 * Tryggvi Bragason - 2019
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const OptionType = new GraphQLObjectType({
  name: 'Option',
  fields: {
    oID: { type: GraphQLInt },
    optionText: { type: GraphQLString },
    qID: { type: GraphQLInt },
  },
});

export default OptionType;
