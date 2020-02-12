/*
* DASHBOARD - users and option to add records will be shown here
* - only admins can see this page
*/

import React from 'react';
import { Grid } from 'semantic-ui-react';
import AddRecordForm from '../components/AddRecordForm';

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <AddRecordForm/>
          </Grid.Column>
          <Grid.Column>
            {/* <AddRecordForm/> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Dashboard;