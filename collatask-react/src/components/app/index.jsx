import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import * as routes from '../../constants/routes';

import NavigationComponent from '../navigation';
import HomePageComponent from '../home';
import LoginPageComponent from '../login';
import { withAuthentication } from '../../services/session';

function AppComponent() {
    return (
        <Router>
            <NavigationComponent />
            <div className="main-body-padding">
                <Route exact path={routes.LANDING} component={LoginPageComponent} />
                <Route exact path={routes.HOME} component={HomePageComponent} />
                <Route exact path={routes.SIGN_IN} component={LoginPageComponent} />
            </div>
        </Router>
    );
}

export default withAuthentication(AppComponent);