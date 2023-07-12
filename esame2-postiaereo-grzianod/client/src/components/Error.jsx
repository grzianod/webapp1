import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from "react-bootstrap";
import logo from "../assets/logo.png"
import "../index.css";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";

function Error(props) {
    const params = useParams();

    return (
        <>
            <Container className={"fluid d-flex justify-content-center align-items-center "} style={{height: "80vh"}}>
                    <div className="d-none d-sm-none d-md-none d-lg-block p-0">
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <Image src={logo} style={{opacity: "80%", width: "14rem", height: "14rem" }} className="d-none d-sm-none d-md-none d-lg-block rounded-circle" />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 style={{ width: "16rem", height: "16rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) scaleX(-1)", zIndex: "2" }}
                                 fill="#dd3242"
                                 className="bi bi-exclamation-octagon" viewBox="0 0 16 16">
                                <path
                                    d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                                <path
                                    d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                            </svg>

                        </div>
                    </div>

                <div style={{margin: "4rem"}}>
                    <div className={"d-flex justify-content-center align-items-center"}><strong className={"primary-text"} style={{fontSize: "2.5rem", textAlign: "center"}}>{props.error}</strong></div>
                    <div className={"d-flex justify-content-center align-items-center"}><i className={"primary-text"} style={{fontSize: "1rem", textAlign: "center"}}>Try to refresh this page or contact the system administrator</i></div>
                </div>
            </Container>
        </>
    );
}

export default Error;
