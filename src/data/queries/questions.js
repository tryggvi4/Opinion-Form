/**
 * Tryggvi Bragason - 2019
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { db } from '../database';

const questions = () =>
  new Promise((resolve, reject) => {
    db.get('SELECT * from Questions;', (err, rows) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // console.log(rows);
        resolve(rows);
      }
    });
  });

export default questions;
