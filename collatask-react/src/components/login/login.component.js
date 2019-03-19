import React from 'react';
import './login.component.css';
import { Card, Tabs, Tab } from 'react-bootstrap';
import SignInComponent from './sign-in/sign-in.component';
import SignUpComponent from './sign-up/sign-up.component';

export default class LoginPageComponent extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-center">
                <Card className="login-box-size">
                    <Card.Body>
                        <Card.Title><strong>Colla</strong>Task</Card.Title>
                        <Card.Text>
                            <Tabs>
                                <Tab eventKey="login" title="Sign In" className="login-tab-padding">
                                    <SignInComponent></SignInComponent>
                                </Tab>
                                <Tab eventKey="register" title="Sign Up" className="login-tab-padding">
                                    <SignUpComponent></SignUpComponent>
                                </Tab>
                            </Tabs>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}