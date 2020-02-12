import React, { useState } from 'react';
import { Form, Segment } from 'semantic-ui-react';

const AddRecordForm = () => {
  const [name, setName] = useState({ value: '', error: false });
  const [artist, setArtist] = useState({ value: '', error: false });
  const [albumArt, setAlbumArt] = useState({ value: '', error: false });
  const [spotifyURL, setSpotifyURL] = useState({ value: '', error: false });
  const [purchaseURL, setPurchaseURL] = useState({ value: '', error: false });

  const handleChange = (data) => {
    switch (data.field) {
      case 'NAME':
        return setName({ value: data.value, error: false });
      case 'ARTIST':
        return setArtist({ value: data.value, error: false });
      case 'ALBUM_ART':
        return setAlbumArt({ value: data.value, error: false });
      case 'SPOTIFY_URL':
        return setSpotifyURL({ value: data.value, error: false });
      case 'PURCHASE_URL':
        return setPurchaseURL({ value: data.value, error: false });
    }
  }

  const handleSubmit = (event) => {
    // 1. validate
    // 2. dispatch redux action
    // 3. POST to server / database
    // 4A. on successful request add to redux state
    // 4B. on failure show error

    event.preventDefault();
    if (!validateForm()) return;

    alert('Submitted!');
  }

  const validateForm = () => {
    let valid = true;
    
    if (name.value.trim().length <= 0) {
      setName({ value: name.value, error: 'Required field' });
      valid = false;
    }

    if (artist.value.trim().length <= 0) {
      setArtist({ value: artist.value, error: 'Required field' });
      valid = false;
    }

    if (!isValidURL(albumArt.value.trim())) {
      setAlbumArt({ value: albumArt.value, error: 'Invalid URL' });
      valid = false;
    }

    if (albumArt.value.trim().length <= 0) {
      setAlbumArt({ value: albumArt.value, error: 'Required field' });
      valid = false;
    }

    if (spotifyURL.value.trim().length > 0 && !isValidURL(spotifyURL.value.trim())) {
      setSpotifyURL({ value: spotifyURL.value, error: 'Invalid URL' });
      valid = false;
    }

    if (purchaseURL.value.trim().length > 0 && !isValidURL(purchaseURL.value.trim())) {
      setPurchaseURL({ value: purchaseURL.value, error: 'Invalid URL' });
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

  return (
    <div>
      <h2>Add new record</h2>
        <Segment>
          <Form>
            <Form.Input label="Name" placeholder="Record name" required onChange={(event, { value }) => handleChange({ field: 'NAME', value })} value={name.value} error={name.error} />
            <Form.Input label="Artist" placeholder="Record artist(s)" required onChange={(event, { value }) => handleChange({ field: 'ARTIST', value })} value={artist.value} error={artist.error} />
            <Form.Input label="Album Art" placeholder="URL or browse" required onChange={(event, { value }) => handleChange({ field: 'ALBUM_ART', value })} value={albumArt.value} error={albumArt.error} action={{ icon: 'folder open', content: 'Browse...', onClick: (event) => handleBrowse(event) }} />
            <Form.Input label="Spotify URL" placeholder="Link to Spotify" onChange={(event, { value }) => handleChange({ field: 'SPOTIFY_URL', value })} value={spotifyURL.value} error={spotifyURL.error} />
            <Form.Input label="Purchase URL" placeholder="Link to store" onChange={(event, { value }) => handleChange({ field: 'PURCHASE_URL', value })} value={purchaseURL.value} error={purchaseURL.error} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Form.Button onClick={ (event) => handleSubmit(event) }>Submit</Form.Button>
            </div>
          </Form>
        </Segment>
    </div>
  )
}

export default AddRecordForm;