import React from 'react';
import { Segment, Table, Transition, Button, List, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { sendPromoteRequest, sendDeleteRequest, sendNextRequest } from '../store/actions/requests';

const RequestsList = ({ authenticated, user, requests, sendPromoteRequest, sendDeleteRequest, sendNextRequest, current }) => {
  const user_name = authenticated ? user.user_name : null; // since already using user.user_name in map requests below
  const level = authenticated ? user.level : null; // same

  const handleClickPromote = async (id) => {
    await sendPromoteRequest(id);
  }

  const handleClickRemove = async (id) => {
    await sendDeleteRequest(id);
  }

  const handleClickNext = async () => {
    await sendNextRequest();
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
        <h2>Record Requests</h2>
        <Segment>
          {requests.length > 0 ? (
            <>
              {authenticated && user.level === 'admin' ? (
                <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                  <Button onClick={handleClickNext}>Next</Button> 
                </div>
              ) : null}
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
            </>
          ) : (
            <div style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h3>No requests yet...</h3>
            </div>
          )}
        </Segment>
      </div>
    </>
  )
}

const mapStateToProps = ({ auth: { authenticated, user }, requests: { requests, current } }) => ({
  authenticated,
  user,
  requests,
  current
});

export default connect(mapStateToProps, { sendPromoteRequest, sendDeleteRequest, sendNextRequest })(RequestsList);