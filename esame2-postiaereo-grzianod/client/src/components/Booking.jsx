import {Button, Table, Form, Alert, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Error from "./Error.jsx";
import Loading from "./Loading.jsx";
import API from "../API.jsx";
import Line from "./Line.jsx";
import Legend from "./Legend.jsx";
import isEmpty from "validator/es/lib/isEmpty.js";
import Status from "./Status.jsx";

function Booking(props) {
    const params = useParams();

    const f = props.flights.get(params.plane).lines, p = props.flights.get(params.plane).seats;

    const [selectedSeats, setSelectedSeats] = useState([]); //selected seats state
    const [bookedSeats, setBookedSeats] = useState([]); //already booked seats state
    const [conflictSeats, setConflictSeats] = useState([]); //conflict seats (booked in the meantime) state

    const [automatic, setAutomatic] = useState(false);  //automatic assignment seats state
    const [alert, setAlert] = useState(false);  //alert state
    const [loading, setLoading] = useState(false);  //data loading state
    const [availability, setAvailability] = useState(false);    //seats check loading state
    const [error, setError] = useState(false);  //error state
    const [alreadyBooked, setAlreadyBooked] = useState(false);  //state to keep track if the user has already committed a reservation

    let seats = Array.from({length: p * f}, (seat, index) => parseInt(index / p + 1).toString() + String.fromCharCode(index % p + 65));

    let lines = [];
    for (let i = 0; i < seats.length; i += p) lines.push(seats.slice(i, i + p));

    function hexToRGBA(hex, alpha) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function reserve(event) {
        event.preventDefault();

        if (isEmpty(event.target.value)) {
            setAlert("Invalid number of seats!");
            setTimeout(() => { setAlert(false) }, 3000);
            setSelectedSeats([]);
            return;
        }

        const value = parseInt(event.target.value);
        let n = value - selectedSeats.length;

        if (value > (f * p - bookedSeats.length)) {
            setAlert("Maximum number of reservable seats exceeded!");
            setTimeout(() => setAlert(false), 3000);
            setSelectedSeats(seats.filter((seat) => !bookedSeats.includes(seat)).map((seat) => seat));
            return;
        }

        if (n > 0) {
            for (let i = 0; i < n; i++)
                setSelectedSeats((selectedSeats) => [...selectedSeats, seats.filter((seat) => !selectedSeats.includes(seat)).filter((seat) => !bookedSeats.includes(seat)).reverse().pop()]);
        } else {
            setSelectedSeats((selectedSeats) => [...selectedSeats.slice(0, selectedSeats.length + n)]);
        }

    }

    function handleBooking(event) {
        event.preventDefault();
        setAvailability(true);
        API.addReservation(params.plane, selectedSeats)
            .then((response) => {
                if (response["error"]) {
                    setError(response["error"])
                    setLoading(false);
                } else {
                    if (response.conflicts) {
                        setConflictSeats(response.conflicts.map((seat) => seat.seat))
                        setSelectedSeats([]);
                        setAlert("Reservation failed! Some requested seats ("+response.conflicts.length+") have been booked meanwhile.");
                        setTimeout(() => setLoading(true), 5000);
                    }
                    else {
                        if(response.reserved && response.booked) {
                            setSelectedSeats(response.reserved.map((seat) => seat.seat));
                            setBookedSeats(response["booked"].map(item => item.seat));
                            setAlreadyBooked(true);
                        }
                    }
                }
            })
            .catch((response) => setError(response["error"]))
            .finally(() => setAvailability(false));
    }

    function cancelBooking(event) {
        event.preventDefault();
        API.deleteBooking(params.plane)
            .then((response) => {
                if (response["error"]) {
                    setError(response["error"])
                } else {
                    setLoading(true);
                }
            })
            .catch((response) => setError(response["error"]))
    }

    function reset(event) {
        event.preventDefault();
        setLoading(true);
    }

    useEffect(() => {
        setLoading(true);
    }, [params]);

    useEffect(() => {
        if (loading && !props.login) {
            API.getBookedSeats(params.plane)
                .then((response) => {
                    if (response["error"]) {
                        setError(response["error"])
                    } else {
                        setBookedSeats(response["booked"].map(item => item.seat));
                        setSelectedSeats([]);
                        setConflictSeats([]);


                        setError(false);
                        setAlert(false);
                        setAlreadyBooked(false);
                    }
                })
                .catch((response) => setError(response["error"]))
                .finally(() => setLoading(false));
        }
        if (loading && props.login) {
            API.getReservedSeats(params.plane)
                .then((response) => {
                    if (response["error"]) {
                        setError(response["error"])
                    } else {
                        setBookedSeats(response["booked"].map(item => item.seat));
                        setSelectedSeats(response["reserved"].map(item => item.seat));
                        setConflictSeats([]);

                        setError(false);
                        setAlert(false);
                        setAlreadyBooked(response["reserved"].length > 0);
                    }
                })
                .catch((response) => setError(response["error"]))
                .finally(() => setLoading(false));
        }
    }, [loading]);


    if (error) return (<Error error={error}></Error>);

    if (!error && loading) return (<Loading></Loading>);

    if (!error && !loading) return (<>
            <Container
                className={"d-flex align-items-center justify-content-around"}>

                {/* Row container of status & controls on larger screens */}
                {props.login ? <Container
                    className={"col-3 align-items-center justify-content-evenly col d-none d-sm-none d-md-none d-lg-flex"}>
                    <Container className={"d-flex flex-column w-auto m-0"}
                               onMouseEnter={() => alreadyBooked ? setAlert("Please cancel your current reservation in order to change seats!") : false }
                               onMouseLeave={() => alreadyBooked ? setAlert(false) : false}>
                        <i className={"d-flex primary-text text-center"}>Automatic assignment</i>
                        <Form.Switch checked={automatic}
                                     disabled={alreadyBooked}
                                     style={{display: "block", textAlign: "center"}}
                                     onChange={() => { setAutomatic((automatic) => !automatic) }}></Form.Switch>
                    </Container>
                    <Button
                        disabled={alreadyBooked || (selectedSeats.length === 0)}
                        variant={"outline-primary"}
                        className={"d-flex w-auto mx-4"} onClick={reset}>Reset</Button>
                </Container> : false}

                <Status
                    login={props.login}
                    flights={props.flights}
                    handleBooking={handleBooking}
                    selectedSeats={selectedSeats}
                    bookedSeats={bookedSeats}
                    reserve={reserve}
                    automatic={automatic}
                    alreadyBooked={alreadyBooked}>
                </Status>

                {props.login ? <Container
                    className={"col-3 align-items-center justify-content-evenly d-none d-sm-none d-md-none d-lg-flex"}>

                    <Button
                        disabled={!alreadyBooked}
                        variant={"danger"}
                        style={{display: alreadyBooked ? "flex" : "none"}}
                        className={"w-auto mx-2 "}
                        onClick={cancelBooking}>Cancel Reservation</Button>

                    <Button
                        disabled={ selectedSeats.length === 0 || availability }
                        variant={"outline-primary"}
                        style={{display: !alreadyBooked ? "flex" : "none"}}
                        className={"w-auto mx-2"}
                        onClick={handleBooking}>
                        {availability ? <Spinner style={{width: "1.5rem", height: "1.5rem"}}></Spinner> : "Book Now!"}
                    </Button>


                </Container> : false}

            </Container>

            <Container className={"col d-flex flex-column d-sm-flex d-md-flex d-lg-none"}>

                {/* Controls are displayed on the top of the seats table and at the bottom of the status table on smaller screens */}
                {props.login ? <Container
                    className={"d-flex d-sm-flex d-md-flex d-lg-none align-items-center justify-content-evenly mb-3"}>
                    <Container className={"d-flex align-items-center justify-content-center w-auto"}>
                        <Container className={"d-flex flex-column w-auto my-2"}
                                   onMouseEnter={() => alreadyBooked ? setAlert("Please cancel your current reservation in order to change seats!") : false }
                                   onMouseLeave={() => alreadyBooked ? setAlert(false) : false}>
                            <i className={"primary-text text-center"}>Automatic assignment</i>
                            <Form.Switch checked={automatic}
                                         disabled={alreadyBooked}
                                         style={{display: "inline-block", textAlign: "center"}}
                                         onChange={() => { setAutomatic((automatic) => !automatic)}}></Form.Switch>
                        </Container>
                        <Button
                            disabled={alreadyBooked || (selectedSeats.length === 0)}
                            variant={"outline-primary"}
                            className={"d-flex w-auto mx-4"} onClick={reset}>Reset</Button>

                        <Button
                            disabled={!alreadyBooked}
                            variant={"danger"}
                            style={{display: alreadyBooked ? "flex" : "none"}}
                            className={"w-auto mx-2 "}
                            onClick={cancelBooking}>Cancel Reservation</Button>

                        <Button
                            type={"submit"}
                            disabled={ selectedSeats.length === 0 || availability }
                            variant={"outline-primary"}
                            style={{display: !alreadyBooked ? "flex" : "none"}}
                            className={"w-auto mx-2"}
                            onClick={handleBooking}>
                            {availability ? <Spinner style={{width: "1.5rem", height: "1.5rem"}}></Spinner> : "Book Now!"}
                        </Button>


                    </Container>
                </Container> : false}
            </Container>

            {/* Container with centered seats table and Legend on the right on larger screens */}
            <Container
                className={"d-flex align-items-start justify-content-around rounded-5 background-container w-auto"}>

                <Container className={"d-none d-sm-none d-md-none d-lg-flex col"}
                           style={{opacity: "0"}}></Container>

                <Table key={"seats_table"}
                       onMouseEnter={() => alreadyBooked ? setAlert("Please cancel your current reservation in order to change seats!") : false }
                       onMouseLeave={() => alreadyBooked ? setAlert(false) : false}
                       style={{borderLeft: "3px solid " + hexToRGBA(props.flights.get(params.plane).color, 0.3), borderRight: "3px solid " + hexToRGBA(props.flights.get(params.plane).color, 0.3)}}
                       className={"table col-xs-3 col-sm-3 col-md-auto col-lg-auto justify-content-center align-items-center primary-text rounded-3 w-auto mx-xxl-5 mx-lg-2" }
                       id="table">
                    <tbody key={"seats_body"} id="table_body">

                    {lines.map((line, line_index) => <Line
                        key={line_index}
                        flights={props.flights}
                        line={line}
                        line_index={line_index}
                        automatic={automatic}
                        login={props.login}
                        bookedSeats={bookedSeats}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        conflictSeats={conflictSeats}
                        availability={availability}
                        alreadyBooked={alreadyBooked}
                    ></Line>)}
                    </tbody>
                </Table>

                {/* Legend table displayed on the right of the seats table on larger screens */}
                <Container className={"col d-none flex-column d-sm-none d-md-none d-lg-flex"}>
                    <Legend login={props.login} flights={props.flights} alreadyBooked={alreadyBooked}></Legend>
                </Container>

            </Container>

            {/* Legend table displayed at the bottom of the seats table on smaller screens */}
            <Container className={"col-auto d-flex flex-column d-sm-flex d-md-flex d-lg-none"}>
                <Legend login={props.login} flights={props.flights} alreadyBooked={alreadyBooked}></Legend>
            </Container>

            {/* Alert message to be shown (or not) at the fixed bottom */}
            {alert ? <Container className={"align-items-center d-flex justify-content-center fixed-bottom"}><Alert
                dismissible className={"text-center"} style={{width: "50rem"}} value={alert}
                onClose={() => setAlert('')} variant={alreadyBooked ? "warning" : "danger"}>{alert}</Alert></Container> : false}

        </>);
}

export default Booking;