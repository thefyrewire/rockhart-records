import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import AddRecordForm from './AddRecordForm';

const EditRecordModal = ({ record: { records }, modalOpen, recordID }) => {
  const [recordToEdit, setRecordToEdit] = useState({});

  useEffect(() => {
    const recordIndex = records.findIndex(record => record.id === recordID);
    if (recordIndex === -1) {
      console.log('rip');
    } else {
      setRecordToEdit(records[recordIndex]);
    }
  }, [records, recordID]);

  const handleEditSave = (record) => {
    console.log('saved!');
    console.log(record);
  }

  return (
    <Modal open={modalOpen} size="tiny">
      <Modal.Content scrolling>
        <AddRecordForm isEditing={true} recordToEdit={recordToEdit} handleEditSave={handleEditSave} />
      </Modal.Content>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  record: state.records
})

export default connect(mapStateToProps)(EditRecordModal);