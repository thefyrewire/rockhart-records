import React from 'react';
import { Segment, Image, List, Button, Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { sendClearCurrentRequest } from '../store/actions/requests';

const CurrentRequest = ({ current, sendClearCurrentRequest, auth: { authenticated, user } }) => {
  const handleClickClear = async () => {
    await sendClearCurrentRequest();
  }

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

        .visible.transition {
          display: flex !important;
        }
      `}</style>
      <div>
        <h2>Current Request</h2>
        <Segment>
          <Transition visible={!!current} unmountOnHide mountOnShow animation="fade up">
          {/* {current ? ( */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
              <Image circular size="small" src={current ? current.record.album_art : ''} className="record-spin" />
              <List style={{ textAlign: 'center', marginBottom: 0 }} size="big">
                <List.Item>
                  <List.Header>{current ? current.record.name : ''}</List.Header>
                  <List.Description>{current ? current.record.artist : ''}</List.Description>
                </List.Item>
              </List>
              <List style={{ textAlign: 'center' }}>
                <List.Item style={{ opacity: 0.5 }}>
                  <List.Description>Requested by</List.Description>
                  <List.Header>{current ? current.user.user_name : ''}</List.Header>
                </List.Item>
              </List>
              {authenticated && user.level === 'admin' ? (<Button fluid icon="delete" content="Clear" onClick={handleClickClear} />) : null}
            </div>
          </Transition>
          {!current ? (
            <div style={{ textAlign: 'center' }}>
              <h4>Nothing playing yet...</h4>
            </div>
          ) : null}
        </Segment>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  current: state.requests.current,
  auth: state.auth
});

export default connect(mapStateToProps, { sendClearCurrentRequest })(CurrentRequest);