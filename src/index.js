import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import App_DropdownList from "./App_DropdownList";

// ReactDOM.render(<App />, document.getElementById('pageContainer'));
ReactDOM.render(<App_DropdownList />, document.getElementById('pageContainer'));
// ReactDOM.render(element, document.getElementById('pageContainer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
