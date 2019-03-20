import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../../constants/routes'
import { withFirebase } from '../../../services/firebase';

function SignOutComponent(firebase) {
    return (
        <Link className="nav-item nav-link" onClick={firebase.signOut} to={routes.SIGN_IN}>Sign Out</Link>
    );
}

export default withFirebase(SignOutComponent);