import 'bootstrap/dist/css/bootstrap.min.css';
import {Image} from "react-bootstrap";
import logo from "../assets/logo.gif"
import "../index.css"
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";

const loading_phrases = ["Fastening seatbelts...", "Clearing for takeoff...", "Navigating the skies...", "Fueling up...", "Preparing for departure..."];


function Loading() {
    const params = useParams();

    return (
        <>
            <Container className={"fluid d-flex justify-content-center align-items-center"} style={{height: "80vh"}}>
                <div className="d-none d-sm-none d-md-none d-lg-block spinner-container">
                    <Image src={logo}
                           style={{width: "14rem", height: "14rem", position: "absolute", marginTop: "0.7rem"}}
                           className="d-none d-sm-none d-md-none d-lg-block rounded-circle"></Image>
                    <div className="loading-spinner" style={{width: "15rem", height: "15rem"}}></div>
                </div>
                <div className={"d-flex justify-content-center align-items-center p-5"}><strong
                    className={"primary-text"} style={{
                    fontSize: "2.5rem",
                    textAlign: "center"
                }}>{loading_phrases[Math.floor(Math.random() * (loading_phrases.length))]}</strong></div>
            </Container>
        </>
    );
}

export default Loading;