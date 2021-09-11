import React from 'react';
import axios from "axios";
import './Chat.css';
import MessageList from './MessageList.jsx';
import NewMessageForm from './NewMessageForm.jsx';

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    //{ id: 0, content: "adsasddsa", author: "unkown"  }, { id: 1, content: "adsasddnnnsa", author: "unkown" },{ id: 2, content: "123132nnsa", author: "teste" }
    this.newMessage = this.newMessage.bind(this);
  }
  componentDidMount(){
    const chatKey = (/[^/]*$/.exec(window.location.href)[0]);
    var apiURL = "http://localhost:3000/api/getchat/";
    if(chatKey.length==0){
      apiURL +="default";
    } else{
      apiURL += chatKey;
    }
    axios.get(apiURL).then((response) => {
      //console.log(response.data[0]);
      this.setState({messages: response.data[0].messages}); 
    });
  }
  newMessage(message){
    var messages = this.state.messages;
    var new_message = {
      id: this.state.messages.length,
      content: message.content,
      author: message.author
  };
    messages.push(new_message);
    this.setState({messages});

    const chatKey = (/[^/]*$/.exec(window.location.href)[0]);
    var apiURL = "http://localhost:3000/api/postMessage/";
    if(chatKey.length==0){
      apiURL +="default";
    } else{
      apiURL += chatKey;
    }
    const res = axios.post(apiURL, new_message);
  }
  render(){
    return(
      <div className="chat-container">
        <MessageList messages={this.state.messages}/>
        <NewMessageForm newMessage={this.newMessage}/>
      </div>
    );
  }
};

export default Chat;