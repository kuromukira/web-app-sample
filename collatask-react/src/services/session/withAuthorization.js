import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../firebase';
import AuthUserContext from './context';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            // listen for firebase auth changes
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>{authUser => condition(authUser) ? <Component {...this.props} /> : null}</AuthUserContext.Consumer>
            );
        }
    }

    return withRouter(withFirebase(WithAuthorization));
};

export default withAuthorization;