/*
* REQUESTS - request queue will be shown here
* - everyone can see this page
* - but only admins can see the option to remove and reorder requests
* - (?) but only logged in users can see the option to remove their own requests
*/

import React from 'react';
import RequestsList from '../components/RequestsList';

const Requests = () => {
  return (
    <div style={{ padding: 20 }}>
      <RequestsList />
    </div>

  )
}

export default Requests;