import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import AddRecordForm from './AddRecordForm';
import { editRecord } from '../store/actions/records';

const EditRecordModal = ({ record: { records }, modalOpen, recordID, editRecord, onEditRecord }) => {
  const [recordToEdit, setRecordToEdit] = useState({});

  useEffect(() => {
    const recordIndex = records.findIndex(record => record.id === recordID);
    if (recordIndex !== -1) setRecordToEdit(records[recordIndex]);
  }, [records, recordID]);

  const handleEditSave = async (record) => {
    await editRecord(recordID, record);
    onEditRecord();
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

export default connect(mapStateToProps, { editRecord })(EditRecordModal);