import React from 'react';
import { Form } from 'react-bootstrap';

export default class SignInComponent extends React.Component {
    render() {
        return (
            <Form>
                <Form.Group controlId="login.email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com"></Form.Control>
                </Form.Group>
                <Form.Group controlId="login.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Your password here"></Form.Control>
                </Form.Group>
            </Form>
        );
    }
}