import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './navbar.css'

function NavigationBar() {
    const expand = "lg";
    return (
        <>
            <Navbar key={expand} bg="white" expand={expand} className="align-items-center m-1">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <ul className={"nav align-items-center align-items-start"}>
                            <li><img src="pixar.gif" width="68" height="68" className="rounded-circle me-2"></img></li>
                            <li style={{fontSize: "2.5rem", color: "#2F3B50"}}>
                                <strong>Netflux</strong></li>
                        </ul>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Body>
                            <Nav className="nav justify-content-end flex-grow-1 pe-3" defaultActiveKey={"#all"}>
                                <Nav.Link href="#all" key="#all" style={{fontSize: "1rem"}}>All</Nav.Link>
                                <Nav.Link href="#favorites" key="#favorites" style={{fontSize: "1rem"}}>Favorites</Nav.Link>
                                <Nav.Link href="#bestrated" key="#bestrated" style={{fontSize: "1rem"}}>Best Rated</Nav.Link>
                                <Nav.Link href="#lastmonth" key="#lastmonth" style={{fontSize: "1rem"}}>Seen Last Month</Nav.Link>
                                <Nav.Link href="#unseen" key="#unseen" style={{fontSize: "1rem"}}>Unseen</Nav.Link>
                            </Nav>
                                <hr/>
                                <Form className="d-flex align-bottom">
                                    <Form.Control
                                        style={{fontStyle: "italic"}}
                                        type="search"
                                        placeholder="Search..."
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <NavDropdown
                                        title={
                                            <img src="me.jpeg" alt="mdo" width="35" height="35"
                                                 className="rounded-circle"></img>
                                        }
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">New Project...</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
                                        <NavDropdown.Item href="#action5">Profile</NavDropdown.Item>
                                        <NavDropdown.Divider></NavDropdown.Divider>
                                        <NavDropdown.Item href="#action5">Sign Out</NavDropdown.Item>
                                    </NavDropdown>
                                </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <hr/>
        </>
    );
}

export default NavigationBar