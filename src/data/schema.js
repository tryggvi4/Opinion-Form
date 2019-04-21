/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

import SurveyType from './types/SurveyType';
import QuestionType from './types/QuestionType';
import OptionType from './types/OptionType';

// import surveys from './queries/surveys';
import questions from './queries/questions';
import options from './queries/options';
import { db } from './database';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      surveys: {
        type: SurveyType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (
          // TODO: Setja inní queries/surveys
          root,
          args,
        ) =>
          new Promise((res, reject) => {
            db.get(
              'SELECT * FROM Surveys WHERE sID = ?;',
              args.id,
              (err, rows) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  res(rows);
                }
              },
            );
          }),
      },
      questions: {
        type: QuestionType,
        resolve: questions,
      },
      options: {
        type: OptionType,
        resolve: options,
      },
    },
  }),
});

export default schema;
