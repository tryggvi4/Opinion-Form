/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query:
        '{surveys(id:"1"){name,questions{questionText,type,options{optionText}}}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.surveys) throw new Error('Failed to load the Survey.');
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: (
      <Layout>
        <Home surveys={data.surveys} />
      </Layout>
    ),
  };
}

export default action;
