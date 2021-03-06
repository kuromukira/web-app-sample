import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutComponent from '../login/sign-out';
import { AuthUserContext } from '../../services/session';

function NavigationComponent() {
    return (
        <AuthUserContext.Consumer>{
            authUser =>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><Link className="navbar-brand" to={authUser ? routes.HOME : routes.LANDING}><strong>To-Do List</strong> App</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {authUser ? <Link className="nav-item nav-link" to={routes.HOME}>Home</Link> : <div></div>}
                            {authUser ? <Link className="nav-item nav-link" to={routes.CALENDAR}>Calendar</Link> : <div></div>}
                            {authUser ? <SignOutComponent></SignOutComponent> : <Link className="nav-item nav-link" to={routes.SIGN_IN}>Sign In</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        }</AuthUserContext.Consumer>
    );
}

export default NavigationComponent;