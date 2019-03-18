import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import * as routes from './constants/routes';

import Navigation from './components/navigation';
import LandingPage from './components/landing-page';
import HomePage from './components/home';
import LoginPage from './components/login';

// This is similar to Angular's app-routing-module and router-link
const App = () => (
    <Router>
        <Navigation />
        <div class="main-body-padding">
            <Route exact path={routes.LANDING} component={LandingPage} />
            <Route exact path={routes.HOME} component={HomePage} />
            <Route exact path={routes.SIGN_IN} component={LoginPage} />
        </div>
    </Router>
);

export default App;