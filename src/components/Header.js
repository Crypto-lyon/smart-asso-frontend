import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

class SiteHeader extends React.Component {
    render () {
        return (
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand href="/">Smart-asso</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/members" className="nav-link menuEntry">Members</Link>
                    <Link to="/proposals" className="nav-link menuEntry">Proposals</Link>
                </Nav>
                <Nav>
                    <Nav.Link href="https://github.com/Crypto-Lyon/smart-asso-frontend" className="menuEntry">Github</Nav.Link>
                    <Nav.Link href="https://crypto-lyon.fr" className="menuEntry">Crypto-Lyon</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default SiteHeader;
