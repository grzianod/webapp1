import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../navbar.css'
import pixar from "../../pixar.gif";
import profile from "../../me.jpeg"
import {filters} from "../App.jsx";
import {useNavigate, useParams} from "react-router-dom";

function NavigationBar(props) {
    const {filter} = useParams();
    const navigate = useNavigate();


    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
            <Container fluid style={{margin: "2rem", marginRight: "0rem", marginBottom: "0rem"}}>
                <Navbar.Brand type={"button"} onClick={() => navigate(`/`)}>
                    <ul className={"nav align-items-center align-items-start"}>
                        <li><img src={pixar} width="68" height="68" className="rounded-circle me-2"></img></li>
                        <li style={{fontSize: "2.1rem", color: "#2F3B50"}}>
                            <strong>Netflux</strong></li>
                    </ul>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="navbar-nav" style={{marginTop: "0.5rem"}}>
                    <Nav className="me-auto">
                        {(!filters.has(filter) || filter === "all") ?
                            <Nav.Link className="active" onClick={() => navigate(`/`)}>All</Nav.Link> :
                            <Nav.Link onClick={() => navigate(`/`)}>All</Nav.Link>}
                        {(filter === "favorites") ?
                            <Nav.Link className="active" onClick={() => navigate(`/favorites`)}>Favorites</Nav.Link> :
                            <Nav.Link onClick={() => navigate(`/favorites`)}>Favorites</Nav.Link>}
                        {(filter === "bestrated") ?
                            <Nav.Link className="active" onClick={() => navigate(`/bestrated`)}>Best Rated</Nav.Link> :
                            <Nav.Link onClick={() => navigate(`/bestrated`)}>Best Rated</Nav.Link>}
                        {(filter === "seenlastmonth") ?
                            <Nav.Link className="active" onClick={() => navigate(`/seenlastmonth`)}>Seen Last
                                Month</Nav.Link> :
                            <Nav.Link onClick={() => navigate(`/seenlastmonth`)}>Seen Last Month</Nav.Link>}
                        {(filter === "unseen") ?
                            <Nav.Link className="active" onClick={() => navigate(`/unseen`)}>Unseen</Nav.Link> :
                            <Nav.Link onClick={() => navigate(`/unseen`)}>Unseen</Nav.Link>}
                    </Nav>

                    <Nav>

                        <Form className={"d-inline-flex"}>
                            <Form.Control
                                style={{fontStyle: "italic", maxWidth: "14rem"}}
                                type="search"
                                placeholder="Search..."
                                className="flex-grow-1 me-2"
                                aria-label="Search"
                            />
                            <NavDropdown
                                align={"end"}
                                title={
                                    <img src={profile} alt="mdo" width="35" height="35"
                                         className="rounded-circle"></img>
                                }>
                                <NavDropdown.Header>Others</NavDropdown.Header>
                                <NavDropdown.Item>New Project...</NavDropdown.Item>
                                <NavDropdown.Item>Settings</NavDropdown.Item>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                <NavDropdown.Divider></NavDropdown.Divider>
                                <NavDropdown.Item>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Form>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavigationBar