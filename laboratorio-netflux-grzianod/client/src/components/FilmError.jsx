import 'bootstrap/dist/css/bootstrap.min.css';
import {Image} from "react-bootstrap";
import pixar from "../../pixar.gif"
import "../../navbar.css"
import Container from "react-bootstrap/Container";

function FilmError(props) {
    return (
        <>
            <Container className={"fluid d-flex justify-content-center align-items-center"} style={{height: "30rem"}}>
                <Image src={pixar} style={{width: "15rem", height: "15rem"}} className="d-none d-sm-none d-md-none d-lg-block rounded-circle"/>
                    <div>
                        <div className={"d-flex justify-content-center align-items-center"}><strong className={"primary-text"} style={{fontSize: "2.5rem", textAlign: "center"}}>{props.error}</strong></div>
                        <div className={"d-flex justify-content-center align-items-center mt-3"}><i className={"primary-text"} style={{fontSize: "1rem", textAlign: "center"}}>Try to refresh the page or contact the system administrator</i></div>
                    </div>
                    </Container>
        </>
    );
}

export default FilmError;