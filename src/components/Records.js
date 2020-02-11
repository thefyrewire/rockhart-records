import React, { useEffect, useReducer } from 'react';
import { Grid, Pagination, Card, Image, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getRecords } from '../store/actions/records';

const Records = ({ record: { records }, getRecords }) => {
  const renderable = 4;
  const initialState = { renderedRecords: [] };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_PAGE':
        return { renderedRecords: records.slice((action.amount*renderable)-renderable, action.amount*renderable) };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      console.log('Fetching records!');
      await getRecords();
      dispatch({ type: 'UPDATE_PAGE', amount: 1 });
    })();

  }, [getRecords]); // <--- values to watch (when values in getRecords change, component re-renders)

  const onPageChange = (event) => {
    console.log(event);
    dispatch({ type: 'UPDATE_PAGE', amount: event.activePage });
  }

  const getPageCount = (items, size) => {
    // e.g. 7 items with 3 items per page means 3 pages
    return items % size === 0 ? items / size : Math.floor(items / size) + 1;
  }

  return (
    <div>
      <h1>Records Catalog</h1>
      <Segment>
        <Grid columns={4}>
          <Grid.Row>
            {state.renderedRecords.map(record => (
              <Grid.Column key={record.id}>
                <Card>
                  <Image src="https://rockhartclothing.com/content/records/Revelation.jpg" wrapped ui={false}></Image>
                  <Card.Content>
                    <Card.Header>{record.name}</Card.Header>
                    <Card.Description>{record.artist}</Card.Description>
                  </Card.Content>
                  <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button style={{ backgroundColor: '#d70000', color: '#fff' }} size="small">Request</Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Segment>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Pagination defaultActivePage={1} totalPages={getPageCount(records.length, renderable)} onPageChange={(event, data) => onPageChange(data)}/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  record: state.records
});

export default connect(mapStateToProps, { getRecords })(Records);