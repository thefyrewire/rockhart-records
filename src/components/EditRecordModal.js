import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, TransitionablePortal } from 'semantic-ui-react';

import AddRecordForm from './AddRecordForm';
import { editRecord, deleteRecord } from '../store/actions/records';

const EditRecordModal = ({ record: { records }, modalOpen, recordID, editRecord, closeModal, deleteRecord }) => {
  const [recordToEdit, setRecordToEdit] = useState({});

  useEffect(() => {
    const recordIndex = records.findIndex(record => record.id === recordID);
    if (recordIndex !== -1) setRecordToEdit(records[recordIndex]);
  }, [records, recordID]);

  const handleEditSave = async (record) => {
    await editRecord(recordID, record);
    transitionModalOut();
  }

  const transitionModalIn = () => {
    document.body.classList.add('modal-fade-in');
  }

  const transitionModalOut = () => {
    document.body.classList.remove('modal-fade-in');
    closeModal();
  }

  const handleEditDelete = async () => {
    await deleteRecord(recordID);
    transitionModalOut();
  }

  return (
    <>
      <style>{`
        .ui.dimmer {
          transition: background-color 0.5s ease;
          background-color: transparent;
        }

        .modal-fade-in .ui.dimmer {
          background-color: rgba(0,0,0,.85);
        }
      `}</style>
      <TransitionablePortal open={modalOpen} transition={{ animation: 'fade down', duration: 500 }} onOpen={transitionModalIn}>
        <Modal open={true} size="tiny" onClose={transitionModalOut}>
          <Modal.Content scrolling={false}>
            <AddRecordForm isEditing={true} recordToEdit={recordToEdit} handleEditSave={handleEditSave} handleEditDelete={handleEditDelete} />
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </>
  )
}

const mapStateToProps = (state) => ({
  record: state.records
})

export default connect(mapStateToProps, { editRecord, deleteRecord })(EditRecordModal);