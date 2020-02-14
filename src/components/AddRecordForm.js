import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { Form, Segment } from 'semantic-ui-react';

import { createRecord } from '../store/actions/records';

const AddRecordForm = ({ createRecord, isEditing = false, handleEditSave, recordToEdit, handleEditDelete }) => {
  const initialState = {
    name: { value: '', error: false },
    artist: { value: '', error: false },
    album_art: { value: '', error: false },
    spotify_url: { value: '', error: false },
    purchase_url: { value: '', error: false },
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'RESET':
        return initialState;
      case 'SET':
        return Object.fromEntries(Object.keys(action.record).map(key => [key, { value: action.record[key] || '', error: false }]));
      case 'VALUE': {
        const newState = { ...state };
        newState[action.field] = Object.assign(newState[action.field], { value: action.value, error: false });
        return newState;
      }
      case 'ERROR': {
        const newState = { ...state };
        newState[action.field] = Object.assign(newState[action.field], { error: action.error });
        return newState;
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, artist, album_art, spotify_url, purchase_url } = state;

  useEffect(() => {
    if (isEditing && recordToEdit.id) {
      dispatch({ type: 'SET', record: recordToEdit });
    }
  }, [isEditing, recordToEdit]);

  const handleChange = (event) => {
    const { name, value } = event;
    dispatch({ type: 'VALUE', field: name, value });
  }

  const handleSubmit = async (event) => {
    // 1. validate
    // 2. dispatch redux action
    // 3. POST to server / database
    // 4A. on successful request add to redux state
    // 4B. on failure show error

    event.preventDefault();
    if (!validateForm()) return;

    const record = {
      name: name.value,
      artist: artist.value,
      album_art: album_art.value,
      spotify_url: spotify_url.value.length > 0 ? spotify_url.value : null,
      purchase_url: purchase_url.value.length > 0 ? purchase_url.value : null
    };
    
    try {
      if (!isEditing) {
        await createRecord(record);
        dispatch({ type: 'RESET' });

      } else handleEditSave(record);

    } catch (error) {
      console.log(error);
    }
  }

  const validateForm = () => {
    let valid = true;
    
    if (name.value.trim().length <= 0) {
      dispatch({ type: 'ERROR', field: 'name', error: 'Required field' });
      valid = false;
    }

    if (artist.value.trim().length <= 0) {
      dispatch({ type: 'ERROR', field: 'artist', error: 'Required field' });
      valid = false;
    }

    if (!isValidURL(album_art.value.trim())) {
      dispatch({ type: 'ERROR', field: 'album_art', error: 'Invalid URL' });
      valid = false;
    }

    if (album_art.value.trim().length <= 0) {
      dispatch({ type: 'ERROR', field: 'album_art', error: 'Required field' });
      valid = false;
    }

    if (spotify_url.value.trim().length > 0 && !isValidURL(spotify_url.value.trim())) {
      dispatch({ type: 'ERROR', field: 'spotify_url', error: 'Invalid URL' });
      valid = false;
    }

    if (purchase_url.value.trim().length > 0 && !isValidURL(purchase_url.value.trim())) {
      dispatch({ type: 'ERROR', field: 'purchase_url', error: 'Invalid URL' });
      valid = false;
    }

    return valid;
  }

  const isValidURL = (url) => {
    try {
      return Boolean(new URL(url)); // fails for 'http://..' for works well for the most part
    }
    catch (error) {
      return false;
    }
  }

  const handleBrowse = (event) => {
    event.preventDefault();
    console.log('click!');
  }

  const handleDelete = (event) => {
    event.preventDefault();
    if (!isEditing || !recordToEdit.id) return;
    handleEditDelete();
  }

  return (
    <div>
      <h2>{!isEditing ? 'Add new' : 'Editing'} record</h2>
        <Segment style={{ marginBottom: '1em' }}>
          <Form>
            <Form.Input label="Name" name="name" placeholder="Record name" required onChange={(event, data) => handleChange(data)} value={name.value} error={name.error} />
            <Form.Input label="Artist" name="artist" placeholder="Record artist(s)" required onChange={(event, data) => handleChange(data)} value={artist.value} error={artist.error} />
            <Form.Input label="Album Art" name="album_art" placeholder="URL or browse" required onChange={(event, data) => handleChange(data)} value={album_art.value} error={album_art.error} action={{ icon: 'folder open', content: 'Browse...', onClick: (event) => handleBrowse(event) }} />
            <Form.Input label="Spotify URL" name="spotify_url" placeholder="Link to Spotify" onChange={(event, data) => handleChange(data)} value={spotify_url.value} error={spotify_url.error} />
            <Form.Input label="Purchase URL" name="purchase_url" placeholder="Link to store" onChange={(event, data) => handleChange(data)} value={purchase_url.value} error={purchase_url.error} />
            <div style={{ display: 'flex'}}>
              {isEditing ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingRight: '1em' }}>
                  <Form.Button onClick={ (event) => handleDelete(event) } negative>Delete</Form.Button>
                </div>
              ) : ''}
              {isEditing ? (
                <div style={{ opacity: 0.4, display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <small>Added: <b>{new Date(recordToEdit.created_at).toLocaleDateString()}</b></small>
                  <small>Last updated: <b>{new Date(recordToEdit.updated_at).toLocaleDateString()}</b></small>
                </div>
              ) : ''}
              <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <Form.Button onClick={ (event) => handleSubmit(event) }>{!isEditing ? 'Submit' : 'Save'}</Form.Button>
              </div>
            </div>
          </Form>
        </Segment>
    </div>
  )
}

const mapStateToProps = (state) => ({
  // record: state.records
  ...state
});

export default connect(mapStateToProps, { createRecord })(AddRecordForm);