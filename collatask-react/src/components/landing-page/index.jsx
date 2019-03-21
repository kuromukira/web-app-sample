import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { AuthUserContext } from '../../services/session';

function LandingPageComponent() {
    return (
        <AuthUserContext.Consumer>{
            authUser =>
                <div>
                    <h4>Hi! Welcome to <strong>To-Do List</strong> App!</h4>
                    {!authUser ? <span><Link to={routes.SIGN_IN}>Sign-In</Link> to continue...</span> : null}
                </div>
        }</AuthUserContext.Consumer>
    );
}

export default LandingPageComponent;