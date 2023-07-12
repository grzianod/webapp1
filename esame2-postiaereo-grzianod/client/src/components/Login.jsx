import {useState} from "react";
import Container from "react-bootstrap/Container";
import {Alert, Button, Image} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import luggage from "../assets/suitcase.gif"
import {useNavigate} from "react-router-dom";
import validator from 'validator';
import API from "../API.jsx";
import Loading from "./Loading.jsx";

function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("test1@polito.it");
    const [password, setPassword] = useState("password");
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleLogin(event) {
        event.preventDefault();
        if (validator.isEmpty(username)) {
            setAlert("Username can not be empty!");
            setTimeout(() => setAlert(false), 3000);
        } else if (!validator.isEmail(username)) {
            setAlert("Invalid email field!");
            setTimeout(() => setAlert(false), 3000);
        } else if (validator.isEmpty(password)) {
            setAlert("Password can not be empty!");
            setTimeout(() => setAlert(false), 3000);
        } else {
            setLoading(true);
            const credentials = {username, password};
            API.login(credentials)
                .then(user => {
                    setAlert(false);
                    props.setUser(user);
                    props.setLogin(true);
                    navigate("/");
                })
                .catch(() => {
                    // NB: Generic error message, should not give additional info (e.g., if user exists etc.)
                    setAlert("Wrong credentials. Please try again");
                    setTimeout(() => setAlert(false), 3000);
                })
                .finally(() => setLoading(false));
        }
    }

    if (loading) return (<Loading></Loading>);

    if (!loading)
    return (<>
            <Container className={"fluid d-flex justify-content-center align-items-center"} style={{height: "30rem"}}>
                <Image src={luggage} style={{width: "20rem", height: "20rem"}}
                       className="d-none d-sm-none d-md-none d-lg-block rounded-circle me-5"/>
                <div>
                    <div className={"d-flex justify-content-center align-items-center"}><strong
                        className={"primary-text"} style={{fontSize: "2.5rem", textAlign: "center"}}>Welcome
                        back!</strong></div>
                    <div className={"d-flex justify-content-center align-items-center"}><i className={"primary-text"}
                                                                                           style={{
                                                                                               fontSize: "1rem",
                                                                                               textAlign: "center"
                                                                                           }}>Please login in order to book seats</i></div>
                    <div className={"d-flex align-items-center mt-3"}></div>
                    <Form onSubmit={handleLogin}>
                        <Container fluid className={"d-flex justify-content-between align-items-center"}>
                            <Form.Control placeholder={"Username"} type={"email"} value={username}
                                          onChange={(e) => setUsername(e.target.value)}></Form.Control>
                        </Container>
                        <Container className={"d-flex align-items-center mt-2"}></Container>
                        <Container fluid className={"d-flex justify-content-between align-items-center"}>
                            <Form.Control placeholder={"Password"} value={password}
                                          type={!showPassword ? "password" : "text"}
                                          className={"me-2"}
                                          onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            <Button className={"d-flex align-items-center justify-content-center w-auto"}
                                    variant={showPassword === true ? "secondary" : "outline-secondary"}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                {(showPassword === true) ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path
                                            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                        <path
                                            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                        <path
                                            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-eye" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                        <path
                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>}
                            </Button>
                        </Container>
                        <Container className={"fluid d-flex justify-content-center align-items-center mt-4"}>
                            <Button variant={"outline-danger"}
                                    className={"d-flex align-items-center justify-content-center m-2"}
                                    onClick={() => navigate("/")}>Cancel</Button>
                            <Button variant={"outline-primary"}
                                    className={"d-flex align-items-center justify-content-center m-2"} type={"submit"}
                                    onClick={handleLogin}>Login</Button>
                        </Container>
                    </Form>
                </div>
            </Container>
            {alert ? <Container className={"align-items-center d-flex justify-content-center fixed-bottom"}><Alert
                dismissible className={"text-center"} style={{width: "50rem"}} value={alert}
                onClose={() => setAlert('')} variant="danger">{alert}</Alert></Container> : false}
        </>)
}

export {Login};