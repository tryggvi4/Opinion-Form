/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import SurveyType from './types/SurveyType';
import QuestionType from './types/QuestionType';
import OptionType from './types/OptionType';
import AnswerType from './types/AnswerType';

// import surveys from './queries/surveys';
import questions from './queries/questions';
import options from './queries/options';
import { db } from './database';

// Hérna er meigin uppistaðan af graphql resolv'unum
// Framendinn notar 'Survey(ID){Questions{Options}}' query
// Resolvin fyrir questions og options listana er í SurveyType og QuestionType
// Future work: færa yfir í sér skrár
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      surveys: {
        type: SurveyType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (root, args) =>
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
      answer: {
        type: AnswerType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (root, args) =>
          new Promise((res, reject) => {
            db.get(
              'SELECT * FROM Answers WHERE aID = ?;',
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
      answers: {
        type: new GraphQLList(AnswerType),
        resolve: () =>
          new Promise((res, reject) => {
            db.all('SELECT * FROM Answers;', (err, rows) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                res(rows);
              }
            });
          }),
      },
    },
  }),
  // Hérna er mutation addAnswer kóðinn
  // Future work, setja í sér skrá
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addAnswer: {
        type: AnswerType,
        args: {
          sID: { type: GraphQLInt },
          whatUser: { type: GraphQLString },
          questionText: { type: GraphQLString },
          questionAns: { type: GraphQLString },
        },
        resolve: (root, args) => {
          const prom = new Promise((res, reject) => {
            // console.log("Keyrir þetta?");
            db.run(
              'INSERT INTO Answers(whatUser, questionText, questionAns, sID) VALUES (?, ?, ?, ?);',
              args.whatUser,
              args.questionText,
              args.questionAns,
              args.sID,
              (err, rows) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  res(rows);
                }
              },
            );
          });
          return prom; // Fyrir eslint no-new og no-unused-vars regluna
        },
      },
    },
  }),
});

export default schema;
