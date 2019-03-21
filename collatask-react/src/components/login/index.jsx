import './login.scss';
import React from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import SignInComponent from './sign-in';
import SignUpComponent from './sign-up';
import { AuthUserContext } from '../../services/session';

function LoginPageComponent() {
    return (
        <AuthUserContext.Consumer>{
            authUser =>
                <div className="d-flex justify-content-center">
                    <Card className="login-box-size">
                        <Card.Body>
                            <Card.Title><strong>To-Do List</strong> App</Card.Title>
                            <Card.Body>
                                {
                                    authUser ?
                                        <div>You are already logged-in as <strong>{authUser.email}</strong></div> :
                                        <Tabs>
                                            <Tab eventKey="login" title="Sign In" className="login-tab-padding">
                                                <SignInComponent></SignInComponent>
                                            </Tab>
                                            <Tab eventKey="register" title="Sign Up" className="login-tab-padding">
                                                <SignUpComponent></SignUpComponent>
                                            </Tab>
                                        </Tabs>
                                }
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </div>
        }</AuthUserContext.Consumer>
    );
}

export default LoginPageComponent;