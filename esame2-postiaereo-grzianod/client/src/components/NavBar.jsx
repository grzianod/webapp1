import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../index.css'
import logo from "../assets/logo.png"
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import API from "../API.jsx";
import {Image} from "react-bootstrap";

function NavigationBar(props) {
    const navigate = useNavigate();
    const params = useParams();

    async function handleSignout() {
        await API.logout();
        props.setLogin(false);
        props.setUser(undefined);
    }

    return (
        <Navbar collapseOnSelect={true} expand={props.flights.size > 4 ? "xxl" : "lg"} bg="#f9f9f9">
        <Container fluid className={"justify-content-between m-4"}>
            <Navbar.Brand type={"button"} onClick={() => navigate(`/`)}>
                <ul className={"nav align-items-center align-items-start"}>
                    <li>
                        <Image alt="photo" src={logo} width="70" height="70"
                               className="rounded-circle me-2"></Image>
                    </li>
                    <li style={{fontSize: "2rem"}}
                        className={"title-text"}>FlyAir
                    </li>
                </ul>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="navbar-nav" className={"mt-2"}>
                <Nav className="me-auto">
                    <Nav.Link
                        key={"link_home"}
                        eventKey={"home"}
                        active={false}
                        className={!params.plane ? "title-text" : "primary-text"}
                        style={{fontWeight: !params.plane ? "bold" : "normal"}}
                        onClick={() => navigate("/")}>Home</Nav.Link>
                    {Array.from(props.flights.keys()).map((name) => <Nav.Link
                        key={"link_"+name}
                        eventKey={name}
                        active={false}
                        style={{ color: params.plane === name ? props.flights.get(params.plane).color : "#3d4857", fontWeight: params.plane === name ? "bold" : "normal"}}
                        onClick={() => navigate("/seats/" + name)}>{[name[0].toUpperCase() + name.slice(1)]}</Nav.Link>)}
                </Nav>

                <Nav>

                    <Form className={"d-inline-flex align-items-center"}>
                        {props.login ?
                            <>
                                <strong
                                    className={"me-2 title-text"}>{props.user.name + " " + props.user.surname}</strong>
                                <Nav.Link key={"link_signout"}
                                          eventKey={"signout"}
                                          active={false}>
                                <Button
                                    className={"d-flex align-items-center justify-content-center mx-1"}
                                    variant={"outline-primary"}
                                    onClick={handleSignout}>Sign Out</Button></Nav.Link>
                            </>
                            :
                            <Nav.Link key={"link_login"}
                                      eventKey={"login"}
                                      active={false}>
                                <Button
                                    className={"d-flex align-items-center justify-content-center mx-1"}
                                    variant={"primary"}
                                    onClick={() => navigate("/login")}>Login</Button>
                            </Nav.Link> }
                    </Form>
                </Nav>

            </Navbar.Collapse>
        </Container>
    </Navbar>);

}

export default NavigationBar