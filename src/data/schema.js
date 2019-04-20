/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import QuestionType from './types/QuestionType';

import questions from './queries/questions';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      questions: {
        type: QuestionType,
        resolve: questions,
      },
    },
  }),
});

export default schema;
