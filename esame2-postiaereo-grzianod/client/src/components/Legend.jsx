import {Button, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useParams} from "react-router-dom";

function Legend(props) {
    const params = useParams();

    return (
        <Container className={"d-flex flex-column align-items-center justify-content-center mt-2"}>
            <Table borderless={true} key={"legend_table"}
                   className="table justify-content-center align-items-center primary-text rounded col-6 w-auto"
                   id="table">
                <thead>
                <tr className={"d-flex justify-content-center align-items-center"}>
                    <td scope={"row"} className={"primary-text align-items-center"}><strong>Legend:</strong></td>
                </tr>
                </thead>
                <tbody key={"legend_body"} id="table_body">
                <tr className={"d-flex align-items-center"}>
                    <td scope={"row"} className={"primary-text align-items-center"}>
                        <Button disabled={!props.login} variant={"outline-" + props.flights.get(params.plane).variant}
                                style={{width: "3rem", height: "3rem"}}
                                className={"d-flex align-items-center justify-content-center"}>S</Button>
                    </td>
                    <td scope={"row"} className={"primary-text"}>
                        <i className={"m-0"}>Free seat</i>
                    </td>
                </tr>
                {props.login ? <tr className={"d-flex align-items-center"}>
                    <td scope={"row"} className={"primary-text align-items-center"}>
                        <Button variant={props.flights.get(params.plane).variant}
                                disabled={props.alreadyBooked}
                                style={{width: "3rem", height: "3rem"}}
                                className={"d-flex align-items-center justify-content-center"}>S</Button>
                    </td>
                    <td scope={"row"} className={"primary-text"}>
                        <i className={"m-0"}>Reserved seat</i>
                    </td>
                </tr> : false}
                <tr className={"d-flex align-items-center"}>
                    <td scope={"row"} className={"primary-text align-items-center"}>
                        <Button variant={props.flights.get(params.plane).variant} disabled={true}
                                style={{width: "3rem", height: "3rem"}}
                                className={"d-flex align-items-center justify-content-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                 className="bi bi-cart-x-fill" viewBox="0 0 16 16">
                                <path
                                    d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
                            </svg>
                        </Button>
                    </td>
                    <td scope={"row"} className={"primary-text"}>
                        <i className={"m-0"}>Booked seat</i>
                    </td>
                </tr>
                {props.login ? <tr className={"d-flex align-items-center"}>
                    <td scope={"row"} className={"primary-text align-items-center"}>
                        <Button variant={"secondary"} disabled={true} style={{width: "3rem", height: "3rem"}}
                                className={"d-flex align-items-center justify-content-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                 className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </Button>
                    </td>
                    <td scope={"row"} className={"primary-text"}>
                        <i className={"m-0"}>Unavailable seat</i>
                    </td>
                </tr> : false}
                </tbody>
            </Table>
        </Container>
    );
}

export default Legend;