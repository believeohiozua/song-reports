import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';


function TopNav() {
    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/">Songs Arena</Navbar.Brand>
                    <Nav className="mx-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/songs">Browse</Nav.Link>
                        <Nav.Link href="/add-song">create</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

        </>
    )
}

export default TopNav;
