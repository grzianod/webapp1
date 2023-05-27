import 'bootstrap/dist/css/bootstrap.min.css';
import {Image} from "react-bootstrap";
import pixar from "../../pixar.gif"
import "../../navbar.css"
import Container from "react-bootstrap/Container";

const loading_phrases = ["Loading films...", "Updating movies...", "Searching for masterpieces...", "Exploring library..."];


function FilmLoading() {
    return (
        <>
            <Container className={"fluid d-flex justify-content-center align-items-center"} style={{height: "30rem"}}>
                <div className="d-none d-sm-none d-md-none d-lg-block spinner-container">
                    <Image src={pixar} style={{width: "15rem", height: "15rem", position:"absolute"}} className="d-none d-sm-none d-md-none d-lg-block rounded-circle"></Image>
                    <div className="loading-spinner"></div>
                </div>
                <div className={"d-flex justify-content-center align-items-center p-5"}><strong className={"primary-text"} style={{fontSize: "2.5rem", textAlign: "center"}}>{loading_phrases[Math.floor(Math.random() * (loading_phrases.length))]}</strong></div>
            </Container>
        </>
    );
}

export default FilmLoading;