import React from 'react';
import { Segment, Image, List } from 'semantic-ui-react';
import { connect } from 'react-redux';

const RequestRail = ({ current }) => {
  return (
    <>
      <style>{`
        .record-spin {
          animation: record-spin-anim 10s linear infinite;
        }

        @keyframes record-spin-anim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div>
        <h2>Current Request</h2>
        <Segment>
          {current ? (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
              <Image circular size="small" src={current.record.album_art} className="record-spin" />
              <List style={{ textAlign: 'center' }}>
                <List.Item>
                  <List.Header>{current.record.name}</List.Header>
                  <List.Description>{current.record.artist}</List.Description>
                </List.Item>
                <List.Item style={{ opacity: 0.5 }}>
                  <List.Description>Requested by</List.Description>
                  <List.Header>{current.user.user_name}</List.Header>
                </List.Item>
              </List>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h4>Nothing playing yet...</h4>
            </div>
          )}
        </Segment>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  current: state.requests.current
});

export default connect(mapStateToProps)(RequestRail);