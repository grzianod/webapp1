import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'
import filmLibrary from "./FilmLibrary.jsx";

function NavigationBar(props) {

    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
            <Container fluid style={{margin: "2rem", marginRight: "0rem"}}>
                <Navbar.Brand href="#">
                    <ul className={"nav align-items-center align-items-start"}>
                        <li><img src="pixar.gif" width="68" height="68" className="rounded-circle me-2"></img></li>
                        <li style={{fontSize: "2.1rem", color: "#2F3B50"}}>
                            <strong>Netflux</strong></li>
                    </ul>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" style={{marginTop: "0.5rem"}}>
                    <Nav className="me-auto" defaultActiveKey={"#all"}>
                        <Nav.Link href="#all" key="#all" style={{fontSize: "1rem"}} onClick={() => { props.setFilter("All"); props.setFilms(filmLibrary.getAll()); }}>All</Nav.Link>
                        <Nav.Link href="#favorites" key="#favorites" style={{fontSize: "1rem"}} onClick={() => { props.setFilter("Favorites"); props.setFilms(filmLibrary.getFavorites());}}>Favorites</Nav.Link>
                        <Nav.Link href="#bestrated" key="#bestrated" style={{fontSize: "1rem"}} onClick={() => { props.setFilter("Best Rated"); props.setFilms(filmLibrary.getBestRated()); }}>Best
                            Rated</Nav.Link>
                        <Nav.Link href="#lastmonth" key="#lastmonth" style={{fontSize: "1rem"}} onClick={() => { props.setFilter("Seen Last Month"); props.setFilms(filmLibrary.getSeenLastMonth());}}>Seen Last
                            Month</Nav.Link>
                        <Nav.Link href="#unseen" key="#unseen" style={{fontSize: "1rem"}} onClick={() => { props.setFilter("Unseen"); props.setFilms(filmLibrary.getUnseen());}}>Unseen</Nav.Link>
                    </Nav>
                    <Nav>

                        <Form className="d-flex">
                            <Form.Control
                                style={{fontStyle: "italic"}}
                                type="search"
                                placeholder="Search..."
                                className="me-2"
                                aria-label="Search"
                            />
                            <NavDropdown
                                         align={"end"}
                                         title={
                                             <img src="me.jpeg" alt="mdo" width="35" height="35"
                                                  className="rounded-circle"></img>
                                         } >
                                <NavDropdown.Header>Others</NavDropdown.Header>
                                <NavDropdown.Item href="#action3">New Project...</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#action5">Profile</NavDropdown.Item>
                                <NavDropdown.Divider></NavDropdown.Divider>
                                <NavDropdown.Item href="#action5">Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Form>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavigationBar