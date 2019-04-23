/**
 * Tryggvi Bragason - 2019
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import QuestionType from './QuestionType';
import { db } from '../database';

// Býr til GraphQLLista til að sýna allar spurningar sem eru tengdar við þessa könnun
const SurveyType = new GraphQLObjectType({
  name: 'Survey',
  fields: {
    sID: { type: GraphQLInt },
    name: { type: GraphQLString },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve: root =>
        new Promise((res, reject) => {
          db.all(
            'SELECT * FROM Questions WHERE sID = ?;',
            root.sID,
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
  },
});

export default SurveyType;
