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
import s from './Header.css';
import Link from '../Link';
import logoUrl from './Valur_logo_Ny_tt.png';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={logoUrl}
              width="38"
              height="38"
              alt="React"
            />
            <span className={s.brandTxt}>Fótboltafélag</span>
          </Link>
          <div className={s.banner}>
            <h1 className={s.bannerTitle}>Viðhorfs kannanir</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
