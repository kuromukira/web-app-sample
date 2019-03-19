import React from 'react';
import { Form, Button, ButtonGroup, Row } from 'react-bootstrap';

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    success: null
}

export default class SignUpComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    btnSignUp_Clicked = (event) => {
        this.setState({ error: null, success: null });
        this.props.firebase.signUp(this.state.email, this.state.password)
            .then(() => {
                var email = this.state.email;
                this.setState(INITIAL_STATE);
                this.setState({ success: 'An email verification link has been sent to ' + email });
            })
            .catch(error => this.setState({ error }));

        event.preventDefault();
    }

    // Change the value inside the state
    onStateChange = (event) => this.setState({ [event.target.name]: event.target.value, success: null, error: null });

    // Validate if the current state is valid for submit
    isStateInvalid = () => this.state.password !== this.state.confirmPassword || this.state.password === '' || this.state.email === '' || this.state.password.length < 6;

    render() {
        return (
            <Form onSubmit={this.btnSignUp_Clicked}>
                <Form.Group as={Row}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} placeholder="name@example.com" onChange={this.onStateChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={this.state.password} placeholder="Must be 6 characters or more" onChange={this.onStateChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="Confirm your password here" onChange={this.onStateChange}></Form.Control>
                </Form.Group>
                <div className="d-flex">
                    {this.state.success && <div className="alert alert-success" role="alert">{this.state.success}</div>}
                    {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error.message}</div>}
                </div>
                <ButtonGroup as={Row} className="d-flex">
                    <Button variant="primary" size="sm" disabled={this.isStateInvalid()} type="submit">SIGN-UP</Button>
                </ButtonGroup>
            </Form>
        );
    }

}