import React from 'react';
import { Segment, Table, Transition, Button, List, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { sendPromoteRequest } from '../store/actions/requests';

const RequestsList = ({ authenticated, user, requests, sendPromoteRequest }) => {
  const user_name = authenticated ? user.user_name : null; // since already using user.user_name is map requests below
  const level = authenticated ? user.level : null; // same

  const handleClickPromote = async (id) => {
    await sendPromoteRequest(id);
  }

  const handleClickRemove = (id) =>{
    console.log(id);
  }

  return (
    <>
      <style>{`
        .table tr.visible.transition {
          display: table-row !important;
        }

        @media only screen and (max-width: 767px) {
          .table tr.visible.transition {
            display: block !important;
          }
        }
      `}</style>
      <div>
        <h1>Record Requests</h1>
        <Segment>
          <Table celled definition striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell collapsing>Position</Table.HeaderCell>
                <Table.HeaderCell>Record</Table.HeaderCell>
                <Table.HeaderCell>Requester</Table.HeaderCell>
                <Table.HeaderCell>Requested At</Table.HeaderCell>
                {authenticated && user.level === 'admin' ? (
                  <Table.HeaderCell>Admin Options</Table.HeaderCell>
                ) : null}
              </Table.Row>
            </Table.Header>
            
            <Transition.Group as={Table.Body} animation="fade down">
              {requests.map(({ id, record, user, created_at }, i) => (
                <Table.Row key={i}>
                  <Table.Cell collapsing>{i+1}</Table.Cell>
                  <Table.Cell>
                    <List>
                      <List.Item>
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                          <Image src="https://rockhartclothing.com/content/records/Revelation.jpg" avatar />
                          <List.Content style={{ paddingLeft: '0.5em' }}>
                            <List.Header>{record.name}</List.Header>
                            <List.Description>{record.artist}</List.Description>
                          </List.Content>
                        </div>
                      </List.Item>
                    </List>
                  </Table.Cell>
                  <Table.Cell>{user_name ? (<b>{user.user_name}</b>) : user.user_name}</Table.Cell>
                  <Table.Cell>{new Date(created_at).toLocaleString()}</Table.Cell>
                    {authenticated && level === 'admin' ? (
                      <Table.Cell textAlign="center" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button icon="angle double up" onClick={() => handleClickPromote(id)} />
                        <Button icon="delete" onClick={() => handleClickRemove(id)} />
                      </Table.Cell>
                    ) : null}
                </Table.Row>
              ))}
            </Transition.Group>

            <Table.Footer>
              <Table.Row>
                
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </div>
    </>
  )
}

const mapStateToProps = ({ auth, requests }) => ({
  authenticated: auth.authenticated,
  user: auth.user,
  requests
});

export default connect(mapStateToProps, { sendPromoteRequest })(RequestsList);