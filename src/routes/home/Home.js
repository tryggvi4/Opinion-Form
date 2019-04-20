/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    // questions: PropTypes.object,
    // questions: PropTypes.oneOfType(
    //   PropTypes.shape({
    //     qID: PropTypes.string.isRequired,
    //     sID: PropTypes.string.isRequired,
    //     questionText: PropTypes.string,
    //   })
    // ).isRequired,
  };

  render() {
    // console.log(this.props);
    return <h1>Hello World</h1>;
  }
}

export default Home; // Sjá eldir útgáfur
