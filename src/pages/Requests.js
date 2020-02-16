/*
* REQUESTS - request queue will be shown here
* - everyone can see this page
* - but only admins can see the option to remove and reorder requests
* - (?) but only logged in users can see the option to remove their own requests
*/

import React, { useState } from 'react';
import { Grid, Responsive } from 'semantic-ui-react';

import RequestsList from '../components/RequestsList';
import CurrentRequest from '../components/CurrentRequest';

const Requests = () => {
  const [shouldStack, setShouldStack] = useState(false);

  const handleResizeUpdate = () => {
    if (window.innerWidth >= 992) setShouldStack(false);
    else setShouldStack(true);
  }

  return (
    <div style={{ padding: 20 }}>
      <Grid celled="internally">
        <Responsive as={Grid.Row} columns={2} onUpdate={handleResizeUpdate} fireOnMount>
          {shouldStack ? (<Grid.Column mobile={16} computer={4}>
            <CurrentRequest />
          </Grid.Column>) : null}
          <Grid.Column mobile={16} computer={12} style={{ boxShadow: 'none' }}>
            <RequestsList />
          </Grid.Column>
          {!shouldStack ? (<Grid.Column mobile={16} computer={4} style={{ boxShadow: 'none' }}>
            <CurrentRequest />
          </Grid.Column>) : null}
        </Responsive>
      </Grid>
    </div>

  )
}

export default Requests;