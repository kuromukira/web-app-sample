import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../firebase';
import { localStoreKeys } from '../../constants/config'

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = { authUser: null };
        }

        componentDidMount() {
            // listen for firebase auth changes
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
                // save token in localstorage
                authUser ?
                    this.props.firebase.getToken()
                        .then((token) => localStorage.setItem(localStoreKeys.token, token))
                    : localStorage.removeItem(localStoreKeys.token);
                // save user email
                authUser ?
                    this.props.firebase.getUserEmail()
                        .then((email) => localStorage.setItem(localStoreKeys.email, email))
                    : localStorage.removeItem(localStoreKeys.email);
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;