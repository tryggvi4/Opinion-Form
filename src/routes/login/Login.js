/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';

class Login extends React.Component {
  render() {
    return (
      <h3 className={s.container}>
        Svörin þín hafa verið vistuð. Takk fyrir að taka þátt
      </h3>
    );
  }
}

export default withStyles(s)(Login);
