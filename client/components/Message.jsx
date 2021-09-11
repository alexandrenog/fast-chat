import React from 'react';
import './Message.css';

export default function Message(props){
  var message = props.message;
  return(
    <p>
      <span className="message-author">{message.author}</span>
      {message.content}
    </p>
  );
};
