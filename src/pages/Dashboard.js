/*
* DASHBOARD - users and option to add records will be shown here
* - only admins can see this page
*/

import React from 'react';
import { Grid } from 'semantic-ui-react';

import AddRecordForm from '../components/AddRecordForm';
import RecordsList from '../components/RecordsList';

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <Grid celled="internally">
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} computer={8}>
            <AddRecordForm />
          </Grid.Column>
          <Grid.Column mobile={16} computer={8} style={{ boxShadow: 'none' }}>
            <RecordsList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Dashboard;