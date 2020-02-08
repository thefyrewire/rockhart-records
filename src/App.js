import React from 'react';
import './App.css';

import Button from '@material-ui/core/Button';

const App = () => {
  const handleClick = async () => {
    const data = await fetch('/api/test').then(d => d.json());
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <Button variant="contained" color="primary" href={`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${encodeURIComponent('http://localhost:3001/auth/callback')}&response_type=code&force_verify=true`}>Login</Button> */}
        <Button variant="contained" color="primary" href={'http://localhost:5000/auth'}>Login</Button>
        <Button variant="contained" color="primary" onClick={handleClick}>Get!</Button>
      </header>
    </div>
  );
}

export default App;
