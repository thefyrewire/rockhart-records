/*
* HOME PAGE - records will be shown here
* - everyone can see this page
* - but only logged in users can see the option to request
*/

import React from 'react';
import Records from './Records';

const Home = () => {
  return (
    // <h2>Records</h2>
    <div style={{ padding: 20 }}>
      <Records/>
    </div>
  )
}

export default Home;