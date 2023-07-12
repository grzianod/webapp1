import Seat from "./Seat.jsx";

function Line(props) {

    return (
        <tr
            key={props.line_index}
            className={"d-flex align-items-center justify-content-center " + ((props.line_index + 1) % 5 === 0 ? "mb-5 " : "") + ((props.line_index === 0) ? "mt-5 ":"")}>
            {props.line.map((seat, index) =>
                <Seat
                    key={props.line_index + "." + index}
                    index={index}
                    flights={props.flights}
                    seat={seat}
                    automatic={props.automatic}
                    login={props.login}
                    selectedSeats={props.selectedSeats}
                    setSelectedSeats={props.setSelectedSeats}
                    bookedSeats={props.bookedSeats}
                    conflictSeats={props.conflictSeats}
                    availability={props.availability}
                    alreadyBooked={props.alreadyBooked}
                ></Seat>
            )}
        </tr>);

}

export default Line;