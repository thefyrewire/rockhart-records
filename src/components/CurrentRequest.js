import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

const RequestRail = ({ current }) => {
  return (
    <div>
      <h2>Current Request</h2>
      <Segment>
        {current ? (
          <div>{current.record.name} - {current.record.artist}</div>
        ) : (
          <h4>Nothing playing yet</h4>
        )}
      </Segment>
    </div>
  )
}

const mapStateToProps = (state) => ({
  current: state.requests.current
});

export default connect(mapStateToProps)(RequestRail);