import React, { useReducer, useEffect } from 'react';
import { Grid, Radio, Segment, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { changeSetting } from '../store/actions/settings'

const RequestSettings = ({ settings, changeSetting }) => {
  const initialState = {
    requests_enabled: false,
    allow_duplicates: false,
    max_user_requests: 5,
    max_total_requests: 50
  }

  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'SET':
        return action.settings;
      case 'CHANGE':
        return { ...state, ...action.setting }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: 'SET', settings });
  }, [settings]);

  const handleChangeSetting = async (event, data) => {
    switch (data.label) {
      case 'Enable requests':
        const requests_enabled = data.checked;
        dispatch({ type: 'CHANGE', setting: { requests_enabled } });
        await changeSetting({ requests_enabled });
        break;
      case 'Allow duplicates':
        const allow_duplicates = data.checked;
        dispatch({ type: 'CHANGE', setting: { allow_duplicates } });
        await changeSetting({ allow_duplicates });
        break;
      case 'Max requests per user':
        if (settings.max_user_requests === state.max_user_requests) return;
        await changeSetting({ max_user_requests: state.max_user_requests });
        break;
      case 'Max total requests':
        if (settings.max_total_requests === state.max_total_requests) return;
        await changeSetting({ max_total_requests: state.max_total_requests });
        break;
      default:
        break;
    }
  }

  const handleChangeInput = (event, data) => {
    if (data.value.trim().length === 0) data.value = 0;
    else if (!Number.isInteger(parseInt(data.value))) return;

    switch (data.label) {
      case 'Max requests per user':
        const max_user_requests = Math.abs(parseInt(data.value));
        dispatch({ type: 'CHANGE', setting: { max_user_requests } });
        break;
      case 'Max total requests':
        const max_total_requests = Math.abs(parseInt(data.value));
        dispatch({ type: 'CHANGE', setting: { max_total_requests } });
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <h2>Settings</h2>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} style={{ padding: 20 }}>
                <Radio toggle label="Enable requests" checked={state.requests_enabled} onChange={handleChangeSetting} />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} style={{ padding: 20 }}>
              <Radio toggle label="Allow duplicates" checked={state.allow_duplicates} onChange={handleChangeSetting} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ padding: 20 }}>
              <Input fluid type="number" label="Max requests per user" value={state.max_user_requests} style={{ width: '100%' }} onChange={handleChangeInput} onBlur={() => handleChangeSetting(null, { label: 'Max requests per user' })} />
            </Grid.Row>
            <Grid.Row style={{ padding: 20 }}>
              <Input fluid type="number" label="Max total requests" value={state.max_total_requests} style={{ width: '100%' }} onChange={handleChangeInput} onBlur={() => handleChangeSetting(null, { label: 'Max total requests' })} />
            </Grid.Row>
          </Grid>
        </Segment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings
})

export default connect(mapStateToProps, { changeSetting })(RequestSettings);