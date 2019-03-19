import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

export default class LandingPageComponent extends React.Component {
    render() {
        return (
            <div>
                <h4>Hi! Welcome to <strong>To-Do List</strong> App!</h4>
                <span><Link to={routes.SIGN_IN}>Sign-In</Link> to continue...</span>
            </div>
        );
    }
}