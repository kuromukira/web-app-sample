import React from 'react';
import { Form, Button, ButtonGroup } from 'react-bootstrap';

export default class SignUpComponent extends React.Component {
    render() {
        return (
            <Form>
                <Form.Group controlId="register.email" required>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com"></Form.Control>
                </Form.Group>
                <Form.Group controlId="register.password" required>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Must be 6 characters or more"></Form.Control>
                </Form.Group>
                <Form.Group controlId="register.confirmpw" required>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password here"></Form.Control>
                </Form.Group>
                <ButtonGroup className="d-flex">
                    <Button variant="primary" size="sm" type="submit">SIGN-UP</Button>
                </ButtonGroup>
            </Form>
        );
    }
}