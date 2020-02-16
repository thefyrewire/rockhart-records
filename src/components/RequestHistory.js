import React from 'react';
import { Segment, List, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import TimeAgo from './TimeAgo';

const RequestHistory = ({ history }) => {
  return (
    <div>
      <h2>Request History</h2>
      <Segment>
        <List>
          {history.map(request => (
            <List.Item key={request.id} style={{ height: 60, display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Image src={request.record.album_art} avatar />
                <List.Content style={{ paddingLeft: '0.5em', overflow: 'hidden' }}>
                  <List.Header style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{request.record.name}</List.Header>
                  <List.Description>{request.record.artist}</List.Description>
                  <List.Description style={{ opacity: 0.5 }}>
                    <TimeAgo date={request.updated_at} />
                  </List.Description>
                </List.Content>
              </div>
            </List.Item>
          ))}
        </List>
      </Segment>
    </div>
  )
}

const mapStateToProps = (state) => ({
  history: state.requests.history.sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at))
});

export default connect(mapStateToProps)(RequestHistory);