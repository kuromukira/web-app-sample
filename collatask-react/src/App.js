import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import * as routes from './constants/routes';

import NavComponent from './components/navigation/nav';
import LandingPageComponent from './components/landing-page/landing-page';
import HomePageComponent from './components/home/home';
import LoginPageComponent from './components/login/login';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <NavComponent />
                <div class="main-body-padding">
                    <Route exact path={routes.LANDING} component={LandingPageComponent} />
                    <Route exact path={routes.HOME} component={HomePageComponent} />
                    <Route exact path={routes.SIGN_IN} component={LoginPageComponent} />
                </div>
            </Router>
        );
    }
}