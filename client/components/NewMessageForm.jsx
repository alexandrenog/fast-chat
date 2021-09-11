import React from 'react';
import './NewMessageForm.css';

class NewMessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: "",
      author: ""
    };
    this.newMessage = this.newMessage.bind(this);
    this.authorChanged = this.authorChanged.bind(this);
    this.messageChanged = this.messageChanged.bind(this);
  }
  newMessage(event) {
      event.preventDefault();
      if (this.state.message.replaceAll(/\s/g,'')=="") return;
      if (this.state.author.replaceAll(/\s/g,'')=="") return;
      //console.log(this.state.author+": "+this.state.message)
      this.setState({message: ""})// limpa o a input box
      this.props.newMessage({content: this.state.message, author: this.state.author})
  }
  authorChanged(event){
    this.setState({author: event.target.value});
  }
  messageChanged(event){
    this.setState({message: event.target.value});
  }
  render(){
    return(
        <form onSubmit={this.newMessage}>
          <div className="column message-form">
            <div className="row">
              <label>Author</label> 
              <input type="text" name="author" value={this.state.author} onChange={this.authorChanged}/>
            </div>
            <label>Message</label> 
            <textarea name="message" rows="6" value={this.state.message} onChange={this.messageChanged}/>
            <input type="submit" className/>
          </div> 
        </form>
        
    );
  }
};

export default NewMessageForm;