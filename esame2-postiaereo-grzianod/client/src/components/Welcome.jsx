import {useState} from "react";
import Container from "react-bootstrap/Container";
import {Alert, Button, Image} from "react-bootstrap";
import logo_gif from "../assets/logo.gif";
import {useNavigate} from "react-router-dom";

function Welcome(props) {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);

    return (
        <Container className="d-flex fluid flex-column justify-content-evenly" style={{minHeight: "100vh"}}>
            <Container className="d-flex justify-content-center align-items-center">
                <Image src={logo_gif} style={{width: "20rem", height: "20rem"}}
                       className="d-none d-lg-block rounded-circle"/>
                <div>
                    {props.login ? (
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                            <strong className="primary-text" style={{fontSize: "2.5rem", textAlign: "center"}}>
                                Welcome&nbsp;back,&nbsp;
                            </strong>
                            <strong className="color-transition" style={{fontSize: "2.5rem", textAlign: "center"}}>
                                {props.user.name}
                            </strong>
                        </div>) : (<div className="d-flex justify-content-center align-items-center">
                        <strong className="primary-text" style={{fontSize: "2.5rem", textAlign: "center"}}>
                            Welcome&nbsp;to&nbsp;
                        </strong>
                        <strong className="color-transition" style={{fontSize: "2.5rem", textAlign: "center"}}>
                            {" FlyAir"}
                        </strong>
                    </div>)}
                    {!props.login && (<div className="d-flex justify-content-center align-items-center">
                        <strong className="color-transition" style={{fontSize: "1rem", textAlign: "center"}}>
                            <i>"Taking dreams to new heights"</i>
                        </strong>
                    </div>)}
                </div>
            </Container>
            <Container className="flex-column justify-content-center mb-5">
                <Container className="align-items-center d-flex justify-content-center">
                    <i
                        className="primary-text d-none d-sm-none d-md-flex justify-content-center mb-0"
                        style={{
                            textAlign: "center"
                        }}
                    >
                        Select a
                        flight {props.login ? "in order to book seats" : "to check availability or login in order to book seats"}
                    </i>
                </Container>
                <Container className="d-md-flex flex-md-row align-items-center justify-content-evenly">
                    { Array.from(props.flights.keys()).map( (name) => <Button
                        key={"button_"+name}
                        className="m-md-3 my-1 w-100"
                        variant={"outline-" + props.flights.get(name).variant}
                        onClick={() => navigate("/seats/"+name)}>
                        <strong style={{fontSize: "1.5rem"}}>{[name[0].toUpperCase() + name.slice(1)]}</strong>
                    </Button> ) }
                </Container>
            </Container>
            {alert && (<Container className="align-items-center d-flex justify-content-center fixed-bottom">
                <Alert dismissible className="text-center" style={{width: "50rem"}} value={alert}
                       onClose={() => setAlert("")} variant="danger">
                    {alert}
                </Alert>
            </Container>)}
        </Container>
    );
}

export {Welcome};
