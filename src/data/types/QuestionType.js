/**
 * Tryggvi Bragason - 2019
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import OptionType from './OptionType';
import { db } from '../database';

// Býr til GraphQLLista til að sýna öll svör sem eru tengd við þessa spurningu
const QuestionType = new GraphQLObjectType({
  name: 'Question',
  fields: {
    qID: { type: GraphQLInt },
    sID: { type: GraphQLInt },
    type: { type: GraphQLString },
    questionText: { type: GraphQLString },
    options: {
      type: new GraphQLList(OptionType),
      resolve: root =>
        new Promise((res, reject) => {
          db.all(
            'SELECT * FROM Options WHERE qID = ?',
            root.qID,
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

export default QuestionType;
