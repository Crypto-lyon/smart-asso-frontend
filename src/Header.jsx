import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class SiteHeader extends React.Component {
    render () {
        return (
            <Navbar bg="primary" variant="dark" fixed="top">
                <Navbar.Brand href="/">Smart-asso</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#">Members</Nav.Link>
                    <Nav.Link href="#">Proposals</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="https://github.com/Crypto-Lyon/smart-asso-frontend">Github</Nav.Link>
                    <Nav.Link href="https://crypto-lyon.fr">Crypto-Lyon</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default SiteHeader;
