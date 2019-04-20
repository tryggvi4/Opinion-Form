/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize from 'sequelize'; // , { Op } from 'sequelize';
// import config from '../config';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
});

export default sequelize;
