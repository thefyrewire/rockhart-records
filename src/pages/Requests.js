/*
* REQUESTS - request queue will be shown here
* - everyone can see this page
* - but only admins can see the option to remove and reorder requests
* - (?) but only logged in users can see the option to remove their own requests
*/

import React from 'react';
import { Grid } from 'semantic-ui-react';

import RequestsList from '../components/RequestsList';
import CurrentRequest from '../components/CurrentRequest';

const Requests = () => {
  return (
    <div style={{ padding: 20 }}>
      <Grid celled="internally">
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} computer={12}>
            <RequestsList />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4} style={{ boxShadow: 'none' }}>
            <CurrentRequest />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>

  )
}

export default Requests;