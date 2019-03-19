import React from 'react';
import { Form } from 'react-bootstrap';

export default class SignUpComponent extends React.Component {
    render() {
        return (
            <Form>
                <Form.Group controlId="login.email" required>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com"></Form.Control>
                </Form.Group>
                <Form.Group controlId="login.password" required>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Must be 6 characters or more"></Form.Control>
                </Form.Group>
                <Form.Group controlId="login.confirmpw" required>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password here"></Form.Control>
                </Form.Group>
            </Form>
        );
    }
}