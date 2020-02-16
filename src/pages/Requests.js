/*
* REQUESTS - request queue will be shown here
* - everyone can see this page
* - but only admins can see the option to remove and reorder requests
* - (?) but only logged in users can see the option to remove their own requests
*/

import React, { useState } from 'react';
import { Grid, Responsive, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import RequestsList from '../components/RequestsList';
import CurrentRequest from '../components/CurrentRequest';
import RequestHistory from '../components/RequestHistory';

const CurrentAndHistory = ({ history }) => (
  <Segment>
    <Grid celled="internally">
      <Grid.Row>
        <Grid.Column mobile={16} computer={16}>
          <CurrentRequest />
        </Grid.Column>
        {history.length > 0 ? (
          <Grid.Column mobile={16} computer={16} style={{ boxShadow: 'none' }}>
            <RequestHistory />
          </Grid.Column>
        ) : null}
      </Grid.Row>
    </Grid>
  </Segment>
)

const Requests = ({ history }) => {
  const [shouldStack, setShouldStack] = useState(false);

  const handleResizeUpdate = () => {
    if (window.innerWidth >= 992) setShouldStack(false);
    else setShouldStack(true);
  }

  return (
    <div style={{ padding: 20 }}>
      <Grid celled="internally">
        <Responsive as={Grid.Row} columns={2} onUpdate={handleResizeUpdate} fireOnMount>
          {shouldStack ? (
            <Grid.Column mobile={16} computer={4}>
              <CurrentAndHistory history={history} />
            </Grid.Column>
          ): null}
          <Grid.Column mobile={16} computer={12} style={{ boxShadow: 'none' }}>
            <Grid.Column>
              <RequestsList />
            </Grid.Column>
          </Grid.Column>
          {!shouldStack ? (
            <Grid.Column mobile={16} computer={4} style={{ boxShadow: 'none' }}>
              <CurrentAndHistory history={history} />
            </Grid.Column>
          ): null}
        </Responsive>
      </Grid>
    </div>

  )
}

const mapStateToProps = (state) => ({
  history: state.requests.history
});

export default connect(mapStateToProps)(Requests);