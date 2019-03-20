import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import * as routes from './constants/routes';

import NavigationComponent from './components/navigation';
import LandingPageComponent from './components/landing-page';
import HomePageComponent from './components/home';
import LoginPageComponent from './components/login';
import { withFirebase } from './services/firebase';

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { authUser: null }
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
        });
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <Router>
                <NavigationComponent authUser={this.state.authUser} />
                <div className="main-body-padding">
                    <Route exact path={routes.LANDING} component={LandingPageComponent} />
                    <Route exact path={routes.HOME} component={HomePageComponent} />
                    <Route exact path={routes.SIGN_IN} component={LoginPageComponent} />
                </div>
            </Router>
        );
    }
}

export default withFirebase(AppComponent);