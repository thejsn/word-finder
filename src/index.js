import React from 'react';
import { render } from 'react-dom';
import Promise from 'bluebird';
import App from './components/App';

window.Promise = Promise;

render(<App />, document.getElementById('app'));