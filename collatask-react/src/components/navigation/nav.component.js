import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

export default class NavigationComponent extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link className="navbar-brand" to={routes.LANDING}><strong>Colla</strong>Task</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><Link className="nav-item nav-link" to={routes.HOME}>Home</Link></Nav.Link>
                        <Nav.Link><Link className="nav-item nav-link" to={routes.SIGN_IN}>Sign In</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}