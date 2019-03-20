import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOutComponent from '../login/sign-out';

function NavigationComponent() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand><Link className="navbar-brand" to={routes.LANDING}><strong>To-Do List</strong> App</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-item nav-link" to={routes.HOME}>Home</Link>
                    <Link className="nav-item nav-link" to={routes.SIGN_IN}>Sign In</Link>
                    <SignOutComponent></SignOutComponent>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationComponent;