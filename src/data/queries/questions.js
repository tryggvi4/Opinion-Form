/**
 * Tryggvi Bragason - 2019
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import QuestionType from '../types/QuestionType';
// import sequelize from '../sequelize';

const questions = {
  type: QuestionType,
  resolve() {
    return 'virkar þetta';

    // request.question && {
    // qID: request.question.qID,
    // questiontext: request.question.questiontext,
  },
};

export default questions;
