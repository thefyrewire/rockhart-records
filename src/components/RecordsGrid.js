import React, { useEffect, useReducer, useState } from 'react';
import { Grid, Pagination, Card, Image, Segment, Button, Responsive, Input, Icon, Loader, Placeholder } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import { connect } from 'react-redux';
import Styled from 'styled-components';

import { createRequest } from '../store/actions/requests';

const RequestButton = Styled(Button)({
  backgroundColor: '#d70000 !important',
  color: '#fff !important',
  '&:hover': {
    backgroundColor: '#a50000 !important'
  }
});

const SpotifyButton = Styled(Button)({
  backgroundColor: 'transparent !important',
  color: '#1db954 !important',
  '&:hover': {
    backgroundColor: '#1db954 !important',
    color: '#fff !important'
  }
});

const PurchaseButton = Styled(Button)({
  backgroundColor: 'transparent !important',
  color: 'rgba(0,0,0,.8) !important',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,.8) !important',
    color: '#cacbcd !important'
  }
});

const Records = ({ user, records, loading, createRequest, settings, requests }) => {
  const renderable = 24;
  const initialState = { search: '', page: 1, renderableRecords: [], renderedRecords: [], removedPlaceholders: [] };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_SEARCH':
        return { ...state, search: action.search };
      case 'UPDATE_PAGE':
        return { ...state, page: action.page };
      case 'UPDATE_RENDERABLE':
        return {
          ...state,
          renderableRecords: records
            .filter(record => record.name.toLowerCase().includes(state.search.toLowerCase()) || record.artist.toLowerCase().includes(state.search.toLowerCase()))
            .sort((a, b) => (a.artist.toLowerCase().startsWith('the ') ? a.artist.substr(4, a.artist.length).toLowerCase() : a.artist.toLowerCase()) > (b.artist.toLowerCase().startsWith('the ') ? b.artist.substr(4, b.artist.length).toLowerCase() : b.artist.toLowerCase()) ? 1 : -1)
        }
      case 'UPDATE_RENDERED':
        return {
          ...state,
          renderedRecords: state.renderableRecords.slice((state.page*renderable)-renderable, state.page*renderable)
        };
      case 'REMOVE_PLACEHOLDER':
        return {
          ...state,
          removedPlaceholders: [...state.removedPlaceholders, action.id]
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [columns, setColumns] = useState(4);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch({ type: 'UPDATE_RENDERABLE' });
    dispatch({ type: 'UPDATE_RENDERED' });
  }, [records]); // <--- values to watch (when records change, component re-renders)

  const handlePageChange = async (event) => {
    setPage(event.activePage);
    dispatch({ type: 'UPDATE_PAGE', page: event.activePage });
    dispatch({ type: 'UPDATE_RENDERED' });
  }

  const getPageCount = (items, size) => {
    // e.g. 7 items with 3 items per page means 3 pages
    return items % size === 0 ? items / size : Math.floor(items / size) + 1;
  }

  const handleResizeUpdate = () => {
    if (window.innerWidth <= 380) setColumns(1);
    else if (window.innerWidth <= 500) setColumns(2);
    else if (window.innerWidth <= 750) setColumns(3);
    else setColumns(4);
  }

  const handleSearch = (event) => {
    setPage(1);
    dispatch({ type: 'UPDATE_PAGE', page: 1 });
    dispatch({ type: 'UPDATE_SEARCH', search: event.value });
    dispatch({ type: 'UPDATE_RENDERABLE' });
    dispatch({ type: 'UPDATE_RENDERED' });
  }

  const handleClickRequest = async (id) => {
    await createRequest(id);
    const record = records.find(record => record.id === id);
    toast({
      type: 'success',
      title: 'Request made!',
      description: `Requested ${record.name}.`,
      time: 5e3
    });

    if (user && settings.max_user_requests !== 0 && requests.filter(request => request.user.id === user.id).length + 1 >= settings.max_user_requests) {
      toast({
        type: 'warning',
        title: 'Limit reached',
        description: 'Maximum number of requests have been made.',
        time: 0
      });
      return;
      
    } else if (settings.max_total_requests !== 0 && requests.length + 1 >= settings.max_total_requests) {
      toast({
        type: 'warning',
        title: 'Global limit reached',
        description: 'Maximum global number of requests have been made.',
        time: 0
      });
      return;
    }
  }

  const handleRemovePlaceholder = (id) => {
    dispatch({ type: 'REMOVE_PLACEHOLDER', id })
  }

  return (
    <div>
      <div style={{ display: 'flex', width: 'calc(100% - 40px)', justifyContent: 'center', position: 'absolute', zIndex: 99 }}>
        <SemanticToastContainer className="toast" animation="fade down" position="top-center" />
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: window.innerWidth <= 550 ? 'column' : 'row' }}>
        <h1>Records Catalog</h1>
        <Input icon="search" iconPosition="left" placeholder="Search..." onChange={(event, data) => handleSearch(data)}></Input>
      </div>
      <Segment>
        <Responsive as={Grid} columns={columns} onUpdate={handleResizeUpdate} fireOnMount celled="internally">
          <Grid.Row stretched>
            {state.renderableRecords.length > 0 ? (
              state.renderedRecords.filter(record => !settings.stream_safe_only || (settings.stream_safe_only && record.stream_safe)).map(record => (
                <Grid.Column key={record.id} style={{ boxShadow: 'none' }}>
                  <Card centered>
                    {state.removedPlaceholders.indexOf(record.id) === -1 ? (
                      <Placeholder>
                        <Placeholder.Image square />
                      </Placeholder>
                    ) : null}
                    <Image src={record.album_art} wrapped ui={false} style={{ display: state.removedPlaceholders.indexOf(record.id) === -1 ? 'none' : 'block' }} onLoad={() => handleRemovePlaceholder(record.id)}></Image>
                    <Card.Content>
                      <Card.Header>{record.name}</Card.Header>
                      <Card.Description>{record.artist}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      {record.spotify_url ? (<SpotifyButton floated="left" href={record.spotify_url} target="_blank" size="small" circular icon={<Icon name="spotify" size="large" />} title="Listen on Spotify" />) : ''}
                      {record.purchase_url ? (<PurchaseButton floated="left" href={record.purchase_url} target="_blank" size="small" circular icon={<Icon name="shopping basket" size="large" style={{ position: 'relative', left: -1 }} />} title="Purchase track" />) : ''}
                      <RequestButton floated="right" style={{ backgroundColor: '#d70000', color: '#fff' }} size="small" onClick={user ? () => handleClickRequest(record.id) : null} href={!user ? 'http://localhost:5000/auth/login' : null}
                        disabled={
                          !settings.requests_enabled
                          || (!settings.allow_duplicates && requests.findIndex(request => request.record.id === record.id) !== -1)
                          || (settings.stream_safe_only && !record.stream_safe)
                          || (user && settings.max_user_requests !== 0 && requests.filter(request => request.user.id === user.id).length >= settings.max_user_requests)
                          || (settings.max_total_requests !== 0 && requests.length >= settings.max_total_requests)
                        }
                      >Request</RequestButton>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              ))
            ) : (
              <div style={{ width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (<Loader active content="Loading" />) : (<h3>No records found...</h3>)}
              </div>
            )}
          </Grid.Row>
        </Responsive>
      </Segment>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Pagination activePage={page} totalPages={getPageCount(state.renderableRecords.length, renderable)} onPageChange={(event, data) => handlePageChange(data)}/>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth: { user }, records: { records, loading }, settings, requests: { requests } }) => ({
  user,
  records,
  loading,
  settings,
  requests
});

export default connect(mapStateToProps, { createRequest })(Records);