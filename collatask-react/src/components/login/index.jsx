import React from 'react';
import './login.css';
import { Card, Tabs, Tab } from 'react-bootstrap';

import { FirebaseContext } from '../../services/firebase/index';

import SignInComponent from './sign-in';
import SignUpComponent from './sign-up';

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
                                    <FirebaseContext.Consumer>
                                        {firebase => <SignInComponent firebase={firebase}></SignInComponent>}
                                    </FirebaseContext.Consumer>
                                </Tab>
                                <Tab eventKey="register" title="Sign Up" className="login-tab-padding">
                                    <FirebaseContext.Consumer>
                                        {firebase => <SignUpComponent firebase={firebase}></SignUpComponent>}
                                    </FirebaseContext.Consumer>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}