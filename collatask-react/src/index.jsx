import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppComponent from './components/app';
import * as serviceWorker from './serviceWorker';

import FirebaseService, { FirebaseContext } from './services/firebase';
import TodoService, { TodoContext } from './services/todo';
import CalendarService, { CalendarContext } from './services/calendar';

document.title = "To-Do List";

ReactDOM.render(
    // Initialize firebase context
    <FirebaseContext.Provider value={new FirebaseService()}>
        <TodoContext.Provider value={new TodoService()}>
            <CalendarContext.Provider value={new CalendarService()}>
                <AppComponent />
            </CalendarContext.Provider>
        </TodoContext.Provider>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
