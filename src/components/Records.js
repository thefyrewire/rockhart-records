import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRecords } from '../store/actions/records';

const Records = ({ record: { records }, getRecords }) => {
  useEffect(() => {
    console.log('Fetching records!');
    getRecords();
  }, [getRecords]); // <--- values to watch (when values in getRecords change, component re-renders)

  return (
    <div>
      <h2>Records</h2>
      <div>
        {records.map(record => (
          <h4 key={record.id}>{record.name}</h4>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  record: state.records
})

export default connect(mapStateToProps, { getRecords })(Records);