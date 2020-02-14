import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Segment, List, Image, Button } from 'semantic-ui-react';

import EditRecordModal from './EditRecordModal';

const RecordsList = ({ record: { records }}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [recordID, setRecordID] = useState('');

  const handleClickEdit = (id) => {
    if (modalOpen) return;
    setModalOpen(true);
    setRecordID(id);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div>
      <h2>Records</h2>
      <Segment>
        <List style={{ height: 416, overflowY: 'scroll' }}>
          {records.sort((a, b) => a.name > b.name).map((record, i) => (
            <List.Item key={record.id} style={{ display: 'flex', backgroundColor: (i % 2 === 0) ? '#fff' : '#f5f5f5' }}>
              <div style={{ display: 'flex', width: '100%', alignItems: 'center', paddingLeft: '1em' }}>
                <Image src="https://rockhartclothing.com/content/records/Revelation.jpg" avatar />
                <List.Content verticalAlign="middle" style={{ paddingLeft: '1em' }}>
                  <List.Header>{record.name}</List.Header>
                  <List.Description as="a">{record.artist}</List.Description>
                </List.Content>
              </div>
              <div style={{ float: 'right', paddingRight: 10, display: 'flex', height: 50, justifyContent: 'flex-end', alignItems: 'center' }} >
                <Button icon="edit" onClick={() => handleClickEdit(record.id)} />
              </div>
            </List.Item>
          ))}
        </List>
        <EditRecordModal modalOpen={modalOpen} recordID={recordID} closeModal={closeModal} />
      </Segment>
    </div>
  )
}

const mapStateToProps = (state) => ({
  record: state.records
});

export default connect(mapStateToProps)(RecordsList);