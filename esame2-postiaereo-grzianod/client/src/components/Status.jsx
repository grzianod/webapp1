import {useParams} from "react-router-dom";
import {Form, Table} from "react-bootstrap";

function Status(props) {
    const params = useParams();

    const f = props.flights.get(params.plane).lines, p = props.flights.get(params.plane).seats;

    return (
        <Table
            key={"status_table"}
            className="table col-lg-auto col-md-auto justify-content-center align-items-center primary-text rounded w-auto mx-md-5 mx-sm-2"
            id="table">
            <thead key={"status_head"} className={"align-items-center justify-content-center"}>
            <tr>
                <td scope={"row"}
                    className={"text-center"}
                    style={{color: props.flights.get(params.plane).color}}><strong>Free
                    seats</strong></td>
                {props.login ?
                    <td scope={"row"}
                        className={"text-center"}
                        style={{color: props.flights.get(params.plane).color}}>
                            <strong>Reserved seats</strong></td> : false}
                <td scope={"row"}
                    className={"text-center"}
                    style={{color: props.flights.get(params.plane).color}}><strong>Booked
                    seats</strong></td>
                <td scope={"row"}
                    className={"text-center"}
                    style={{color: props.flights.get(params.plane).color}}><strong>Total
                    seats</strong></td>
            </tr>
            </thead>
            <tbody key={"status_body"} id="table_body">
            <tr>
                <td scope={"row"}
                    className={"primary-text text-center"}
                    style={{verticalAlign: "middle"}}>{p * f - props.selectedSeats.length - props.bookedSeats.length}</td>
                {props.login ? <td scope={"row"} className={"primary-text text-center"}
                                   style={{verticalAlign: "middle"}}>
                    <Form onSubmit={props.handleBooking}>
                    <Form.Control
                        key={"seat_number"}
                        type={"number"}
                        step={1}
                        readOnly={!props.automatic}
                        disabled={!props.automatic || props.alreadyBooked}
                        min={0}
                        max={f * p}
                        value={(props.selectedSeats.length === 0) ? " " : props.selectedSeats.length}
                        style={{
                            display: "inline-block", textAlign: "center", maxWidth: "7rem"
                        }}
                        onChange={props.reserve}>

                    </Form.Control>
                    </Form>
                </td> : false}
                <td scope={"row"} className={"primary-text text-center"}
                    style={{verticalAlign: "middle"}}>{props.bookedSeats.length}</td>
                <td scope={"row"} className={"primary-text text-center"}
                    style={{verticalAlign: "middle"}}>{p * f}</td>
            </tr>
            </tbody>
        </Table>
    );
}

export default Status;