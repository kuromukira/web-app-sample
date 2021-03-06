import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../services/firebase';
import * as routes from '../../../constants/routes';
import { Form, Button, ButtonGroup, Row } from 'react-bootstrap';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    success: null,
    inProgress: false
}

class SignInComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    completeSignIn(email) {
        this.setState(INITIAL_STATE);
        this.setState({ success: 'Welcome ' + email });
        this.props.history.push(routes.HOME);
    }

    btnSignIn_Clicked = (event) => {
        this.setState({ error: null, success: null, inProgress: true });
        this.props.firebase.signIn(this.state.email, this.state.password)
            .then(() => this.completeSignIn(this.state.email))
            .catch(error => this.setState({ error, success: null, inProgress: false }));

        event.preventDefault();
    }

    btnSignInGoogle_Clicked = (event) => {
        this.setState({ error: null, success: null, inProgress: true });
        this.props.firebase.signInGoogle()
            .then(() => this.completeSignIn('...'))
            .catch(error => this.setState({ error, success: null, inProgress: false }));

        event.preventDefault();
    }

    btnForgotPass_Clicked = (event) => {
        this.setState({ error: null, success: null, inProgress: true });
        this.props.firebase.forgotPassword(this.state.email)
            .then(() => this.setState({ success: 'Password reset link has been sent to ' + this.state.email }))
            .catch(error => this.setState({ error, success: null, inProgress: false }))
            .finally(() => this.setState({ inProgress: false }));

        event.preventDefault();
    }

    // Change the value inside the state
    onStateChange = (event) => this.setState({ [event.target.name]: event.target.value, success: null, error: null, inProgress: false });

    // Validate if the current state is valid for submit
    isStateInvalid = () => this.state.password === '' || this.state.email === '' || this.state.password.length < 6 || this.state.inProgress;
    isEmailInvalid = () => this.state.email === '' || this.state.inProgress;

    render() {
        return (
            <Form onSubmit={this.btnSignIn_Clicked}>
                <Form.Group as={Row} controlId="login.email">
                    <Form.Label><strong>Email Address</strong></Form.Label>
                    <Form.Control size="sm" type="email" disabled={this.state.inProgress} name="email" value={this.state.email} onChange={this.onStateChange} placeholder="name@example.com"></Form.Control>
                </Form.Group>
                <Form.Group as={Row} controlId="login.password">
                    <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control size="sm" type="password" disabled={this.state.inProgress} name="password" value={this.state.password} onChange={this.onStateChange} placeholder="Your password here"></Form.Control>
                </Form.Group>
                <div className="d-flex">
                    {this.state.inProgress && <div className="flex-fill alert alert-primary" role="alert">Please wait...</div>}
                    {this.state.success && <div className="flex-fill alert alert-success" role="alert">{this.state.success}</div>}
                    {this.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.state.error.message}</div>}
                </div>
                <ButtonGroup as={Row} vertical className="d-flex">
                    <Button variant="outline-info" size="sm" onClick={this.btnForgotPass_Clicked} disabled={this.isEmailInvalid()}>FORGOT PASSWORD</Button>
                    <Button variant="outline-secondary" size="sm" onClick={this.btnSignInGoogle_Clicked} disabled={this.state.inProgress}>SIGN-IN WITH GOOGLE</Button>
                    <Button variant="primary" size="sm" type="submit" disabled={this.isStateInvalid()}>SIGN-IN</Button>
                </ButtonGroup>
            </Form>
        );
    }

}

export default withRouter(withFirebase(SignInComponent));