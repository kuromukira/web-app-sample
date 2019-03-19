import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppComponent from './app';
import * as serviceWorker from './serviceWorker';

import FirebaseService, { FirebaseContext } from './services/firebase/index';

ReactDOM.render(
    // Initialize firebase context
    <FirebaseContext.Provider value={new FirebaseService()}>
        <AppComponent />
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
