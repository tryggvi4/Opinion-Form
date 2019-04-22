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
// import addAnswer from '../../data/queries/addAnswer';

class Home extends React.Component {
  static propTypes = {
    surveys: PropTypes.shape({
      name: PropTypes.string.isRequired,
      questions: PropTypes.array.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.handelChange = this.handelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  handelChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const answers = Object.entries(this.state);
    answers.forEach(ans => {
      this.addAnswer('demoUser', ans[0], ans[1], 1);
    });
    // this.context.router.history.push('/login');
  }

  async addAnswer(whatUser, questionText, questionAns, sID) {
    await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation{addAnswer(whatUser:"${whatUser}", questionText:"${questionText}", questionAns:"${questionAns}", sID:${sID}){ whatUser questionText questionAns sID}}`,
      }),
    });
  }

  render() {
    // console.log('ER þetta að keyra oft?');
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form onSubmit={this.handleSubmit}>
            <h1>{this.props.surveys.name}</h1>
            {this.props.surveys.questions.map(item => (
              <div key={item.questionText}>
                <h2>{item.questionText}</h2>
                {item.options.map(item1 => (
                  <label htmlFor={item1.optionText} key={item1.optionText}>
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
