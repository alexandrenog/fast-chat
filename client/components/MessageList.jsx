import React from 'react';
import './MessageList.css';
import Message from './Message.jsx';

class MessageList extends React.Component {
  constructor(props) {
    super(props)
    this.props=props;
  }
  render() {
    if (this.props.messages.length>0){
      return (
        <div className="list-container">
          {this.props.messages.map((message) =>
            <Message key={message.id} message={message} />
          )}
        </div>
      );
    }
    return (
      <div className="list-container">
        <p className="new-chat-message">
          This is a new chat
        </p>
      </div>
    );
  }
};

export default MessageList;