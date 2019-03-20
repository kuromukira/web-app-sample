import './login.scss';
import React from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../services/firebase/index';
import SignInComponent from './sign-in';
import SignUpComponent from './sign-up';

const SignInForm = withRouter(withFirebase(SignInComponent));
const SignUpForm = withFirebase(SignUpComponent);

export default class LoginPageComponent extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <Card className="login-box-size">
                    <Card.Body>
                        <Card.Title><strong>To-Do List</strong> App</Card.Title>
                        <Card.Body>
                            <Tabs>
                                <Tab eventKey="login" title="Sign In" className="login-tab-padding">
                                    <SignInForm></SignInForm>
                                </Tab>
                                <Tab eventKey="register" title="Sign Up" className="login-tab-padding">
                                    <SignUpForm></SignUpForm>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}