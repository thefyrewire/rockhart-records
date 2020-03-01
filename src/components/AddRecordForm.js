import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Responsive } from 'semantic-ui-react';

import { createRecord } from '../store/actions/records';
import TimeAgo from './TimeAgo';

import { uploadImage } from '../store/actions/upload';

const AddRecordForm = ({ createRecord, isEditing = false, handleEditSave, recordToEdit, handleEditDelete, uploadImage }) => {
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
  const [browseIconContent, setBrowseIconContent] = useState('Browse...');

  useEffect(() => {
    if (isEditing && recordToEdit.id) {
      dispatch({ type: 'SET', record: recordToEdit });
    }
  }, [isEditing, recordToEdit]);

  const [uploading, setUploading] = useState(false);

  const browser = document.createElement('input');
  browser.setAttribute('type', 'file');
  browser.setAttribute('accept', 'image/*');
  browser.addEventListener('change', async (event) => {
    if (uploading) return;

    const files = event.target.files;
    if (files.length <= 0) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    setUploading(true);
    const response = await uploadImage(formData);
    setUploading(false);

    dispatch({ type: 'VALUE', field: 'album_art', value: response.path });
  });

  const handleChange = (event, data) => {
    const { name, value } = data;
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
    if (uploading) return;
    browser.click();
  }

  const handleDelete = (event) => {
    event.preventDefault();
    if (!isEditing || !recordToEdit.id) return;
    handleEditDelete();
  }

  const handleResizeUpdate = () => {
    if (window.innerWidth <= 405 || window.innerWidth > 991) setBrowseIconContent('')
    else setBrowseIconContent('Browse...');
  }

  return (
    <div>
      <h2>{!isEditing ? 'Add new' : 'Editing'} record</h2>
        <Segment style={{ marginBottom: '1em' }}>
          <Form>
            <Form.Input label="Name" name="name" placeholder="Record name" required onChange={handleChange} value={name.value} error={name.error} icon="music" iconPosition="left" />
            <Form.Input label="Artist" name="artist" placeholder="Record artist(s)" required onChange={handleChange} value={artist.value} error={artist.error} icon="group" iconPosition="left" />
            <Responsive as={Form.Input} fluid onUpdate={handleResizeUpdate} fireOnMount label="Album Art" name="album_art" placeholder="URL or Browse..." required onChange={handleChange} value={album_art.value} error={album_art.error} action={{ icon: 'folder open', content: browseIconContent.length > 0 ? browseIconContent : null, onClick: (event) => handleBrowse(event) }} icon="image" iconPosition="left" loading={uploading} />
            <Form.Input label="Spotify URL" name="spotify_url" placeholder="Link to Spotify" onChange={handleChange} value={spotify_url.value} error={spotify_url.error} icon="spotify" iconPosition="left" />
            <Form.Input label="Purchase URL" name="purchase_url" placeholder="Link to store" onChange={handleChange} value={purchase_url.value} error={purchase_url.error} icon="shopping basket" iconPosition="left" />
            <div style={{ display: 'flex'}}>
              {isEditing ? (
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingRight: '1em' }}>
                  <Form.Button onClick={ (event) => handleDelete(event) } negative>Delete</Form.Button>
                </div>
              ) : ''}
              {isEditing ? (
                <div style={{ opacity: 0.4, display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center' }}>
                  <small>Added: <b><TimeAgo date={recordToEdit.created_at} /></b></small>
                  <small>Last updated: <b><TimeAgo date={recordToEdit.updated_at} /></b></small>
                </div>
              ) : ''}
              <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <Form.Button onClick={ (event) => handleSubmit(event) } disabled={uploading}>{!isEditing ? 'Submit' : 'Save'}</Form.Button>
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

export default connect(mapStateToProps, { createRecord, uploadImage })(AddRecordForm);