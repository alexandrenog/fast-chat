import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

const chatKey = (/[^/]*$/.exec(window.location.href)[0]);

if(chatKey.length == 0){
    var url = "http://localhost:3000/"+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
    window.location.href = url;
}


render(<App />, document.getElementById('root'));
