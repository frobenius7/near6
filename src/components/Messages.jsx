import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function Messages({ messages }) {
  return (
    <>
      <h2>{messages.length} cool messages below</h2>
      {messages.map((message, i) =>
        <div key={i} className={message.premium ? 'card is-premium' : 'card'}>
          <p style={{ marginLeft: '20px' }}>
          {message.premium ? <span className="premium">Premium: </span> : <span></span>}
            <strong>{message.text}</strong><br/>
            <small><i>Added by <span className="sender">{message.sender}</span> on: <span className="date"><Moment>{message.timestamp}</Moment></span></i></small>
          </p>
        </div>
      )}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};
