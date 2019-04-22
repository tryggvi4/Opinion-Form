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
    surveys: PropTypes.shape({
      name: PropTypes.string.isRequired,
      questions: PropTypes.array.isRequired,
    }).isRequired,
    // Of(
    //   PropTypes.shape({
    //     name: PropTypes.string,
    //     questions: PropTypes.string,
    //     map: PropTypes.object,
    //   }),
  };

  constructor(props) {
    super(props);

    this.handelChange = this.handelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handelChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    return this.state;
  }

  render() {
    // console.log(this.props);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form onSubmit={this.handleSubmit}>
            <h1>{this.props.surveys.name}</h1>
            {this.props.surveys.questions.map(item => (
              <div key={item.questionText}>
                <h2>{item.questionText}</h2>
                {item.options.map(item1 => (
                  <label htmlFor={item1.optionText}>
                    {item1.optionText}
                    <input
                      type="radio"
                      name={item.questionText}
                      value={item1.optionText}
                      id={item1.optionText}
                      onChange={this.handelChange}
                    />
                  </label>
                ))}
              </div>
            ))}
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Home; // Sjá eldir útgáfur
