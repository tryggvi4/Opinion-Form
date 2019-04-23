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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import history from '../../history';
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
    history.push('/login'); // Reyndi að búa til thankyou síðu nema það er eitthvað chunks chache dót sem ég hef ekki tíma til að skilja :)
  }

  // Bætir við nýju svari í gagnagrunninn með því að senda mutation skipun á qraphql serverinn
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
    return (
      <div>
        <div>
          <form className={s.form} onSubmit={this.handleSubmit}>
            <h1>{this.props.surveys.name}</h1>
            {this.props.surveys.questions.map(item => (
              <div key={item.questionText}>
                <h2>{item.questionText}</h2>
                <div className={s.questionContainer} key={item.questionText} />
                <div className={s.radioTileGroup}>
                  {item.options.map(item1 => (
                    <div className={s.inputContainer} key={item1.optionText}>
                      <input
                        type="radio"
                        name={item.questionText}
                        value={item1.optionText}
                        id={item1.optionText}
                        className={s.radioButton}
                        onChange={this.handelChange}
                      />
                      <div className={s.radioTile}>
                        <label htmlFor={item1.optionText}>
                          {item1.optionText}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className={s.wordContainer}>
                  <div className={s.agree}>Sammála</div>
                  <div className={s.disagree}>Ósammála</div>
                </div> */}
              </div>
            ))}
            <input
              className={s.button}
              type="submit"
              value="Senda inn könnun"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home); // Sjá eldir útgáfur
