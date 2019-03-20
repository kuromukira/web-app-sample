import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../../../constants/routes'
import { withFirebase } from '../../../services/firebase';

class SignOutComponent extends React.Component {

    btnSignOut_Clicked = (event) => {
        this.props.firebase.signOutUser()
            .then(() => this.props.history.push(routes.LANDING))

        event.preventDefault();
    }

    render() {
        return (
            <Link className="nav-item nav-link" onClick={this.btnSignOut_Clicked} to={routes.SIGN_IN}>Sign Out</Link>
        );
    }
}

export default withRouter(withFirebase(SignOutComponent));