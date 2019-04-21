/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    surveys: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        questions: PropTypes.string.isRequired,
        map: PropTypes.object,
      }),
    ).isRequired,
  };

  render() {
    // console.log(this.props);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.surveys.name}</h1>
          {this.props.surveys.questions.map(item => (
            <div>
              <h2>{item.questionText}</h2>
              {item.options.map(item1 => (
                <h3>{item1.optionText}</h3>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home; // Sjá eldir útgáfur
