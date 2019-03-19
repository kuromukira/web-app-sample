import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import * as routes from './constants/routes';

import NavigationComponent from './components/navigation/nav.component';
import LandingPageComponent from './components/landing-page/landing-page.component';
import HomePageComponent from './components/home/home.component';
import LoginPageComponent from './components/login/login.component';

export default class AppComponent extends React.Component {
    render() {
        return (
            <Router>
                <NavigationComponent />
                <div className="main-body-padding">
                    <Route exact path={routes.LANDING} component={LandingPageComponent} />
                    <Route exact path={routes.HOME} component={HomePageComponent} />
                    <Route exact path={routes.SIGN_IN} component={LoginPageComponent} />
                </div>
            </Router>
        );
    }
}