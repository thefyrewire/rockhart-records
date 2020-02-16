import React from 'react';

import ReactTimeAgo from 'react-time-ago';
import JSTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

JSTimeAgo.locale(en);

const TimeAgo = ({ date = new Date().toISOString(), ...props}) => {
  return (
    <ReactTimeAgo date={new Date(date)} {...props} />
  )
}

export default TimeAgo;