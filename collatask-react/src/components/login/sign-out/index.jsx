import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../../../constants/routes'
import { withFirebase } from '../../../services/firebase';

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
                <Modal size="sm" show={this.state.dialogOpen}>
                    <Modal.Header>
                        <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex">
                        <span>Are you sure you want to sign-out?</span>
                        {this.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.state.error.message}</div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.btnCloseDialog_Clicked}>No</Button>
                        <Button variant="primary" onClick={this.btnSignOut_Clicked}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(withFirebase(SignOutComponent));