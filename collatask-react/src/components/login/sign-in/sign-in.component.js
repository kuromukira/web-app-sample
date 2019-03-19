import React from 'react';
import { Form, Button, ButtonGroup, Row } from 'react-bootstrap';

export default class SignInComponent extends React.Component {

    btnSignIn_Clicked =(event)=> {
        alert("HELLO");
        event.preventDefault();
    }

    btnSignInGoogle_Clicked = (event) => {
        alert("GOOGLE");
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.btnSignIn_Clicked}>
                <Form.Group as={Row} controlId="login.email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com"></Form.Control>
                </Form.Group>
                <Form.Group as={Row} controlId="login.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Your password here"></Form.Control>
                </Form.Group>
                <ButtonGroup as={Row} vertical className="d-flex">
                    <Button variant="outline-secondary" size="sm" onClick={this.btnSignInGoogle_Clicked}>SIGN-IN WITH GOOGLE</Button>
                    <Button variant="primary" size="sm" type="submit">SIGN-IN</Button>
                </ButtonGroup>
            </Form>
        );
    }

}