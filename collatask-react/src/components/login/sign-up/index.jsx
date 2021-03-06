import React from 'react';
import { Form, Button, ButtonGroup, Row } from 'react-bootstrap';
import { withFirebase } from '../../../services/firebase';

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    success: null,
    inProgress: false
}

class SignUpComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    btnSignUp_Clicked = (event) => {
        this.setState({ error: null, success: null, inProgress: true });
        this.props.firebase.signUp(this.state.email, this.state.password)
            .then(() => { })
            .catch(error => this.setState({ error, inProgress: false }));

        event.preventDefault();
    }

    // Change the value inside the state
    onStateChange = (event) => this.setState({ [event.target.name]: event.target.value, success: null, error: null, inProgress: false });

    // Validate if the current state is valid for submit
    isStateInvalid = () => this.state.password !== this.state.confirmPassword || this.state.password === '' || this.state.email === '' || this.state.password.length < 6 || this.state.inProgress;

    render() {
        return (
            <Form onSubmit={this.btnSignUp_Clicked}>
                <Form.Group as={Row}>
                    <Form.Label><strong>Email Address</strong></Form.Label>
                    <Form.Control size="sm" type="email" name="email" disabled={this.state.inProgress} value={this.state.email} placeholder="name@example.com" onChange={this.onStateChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label><strong>Password</strong></Form.Label>
                    <Form.Control size="sm" type="password" name="password" disabled={this.state.inProgress} value={this.state.password} placeholder="Must be 6 characters or more" onChange={this.onStateChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label><strong>Confirm Password</strong></Form.Label>
                    <Form.Control size="sm" type="password" name="confirmPassword" disabled={this.state.inProgress} value={this.state.confirmPassword} placeholder="Confirm your password here" onChange={this.onStateChange}></Form.Control>
                </Form.Group>
                <div className="d-flex">
                    {this.state.inProgress && <div className="flex-fill alert alert-primary" role="alert">Please wait...</div>}
                    {this.state.success && <div className="flex-fill alert alert-success" role="alert">{this.state.success}</div>}
                    {this.state.error && <div className="flex-fill alert alert-danger" role="alert">{this.state.error.message}</div>}
                </div>
                <ButtonGroup as={Row} className="d-flex">
                    <Button variant="primary" size="sm" disabled={this.isStateInvalid()} type="submit">SIGN-UP</Button>
                </ButtonGroup>
            </Form>
        );
    }

}

export default withFirebase(SignUpComponent);