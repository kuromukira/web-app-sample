import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../../../constants/routes'
import { withFirebase } from '../../../services/firebase';
import DialogPromptComponent from '../../dialog/prompt';

class SignOutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dialogOpen: false, error: null };
    }

    btnShowDialog_Clicked = (event) => {
        this.setState({ dialogOpen: true });
        event.preventDefault();
    }

    btnCloseDialog_Clicked = () => {
        this.setState({ dialogOpen: false });
    }

    btnSignOut_Clicked = () => {
        this.setState({ error: null });
        this.props.firebase.signOutUser()
            .then(() => {
                this.setState({ dialogOpen: false });
                this.props.history.push(routes.LANDING);
            })
            .catch(error => this.setState({ error }));
    }

    render() {
        return (
            <div>
                <Link className="nav-item nav-link" onClick={this.btnShowDialog_Clicked} to={routes.SIGN_IN}>Sign Out</Link>
                <DialogPromptComponent
                    dialogShow={this.state.dialogOpen}
                    dialogClose={() => this.setState({ dialogOpen: false })}
                    targetMethod={this.btnSignOut_Clicked}
                    dialogMsg="Are you sure you want to sign-out?"
                    error={this.state.error}
                ></DialogPromptComponent>
            </div>
        );
    }
}

export default withRouter(withFirebase(SignOutComponent));