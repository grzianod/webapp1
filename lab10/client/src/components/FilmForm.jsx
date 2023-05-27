import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {useSearchParams} from "react-router-dom";
import dayjs from "dayjs";

function FilmForm(props) {
    const [searchParams, setSearchParams] = useSearchParams();


    const [title, setTitle] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState(null);
    const [rating, setRating] = useState(0);

    function save(event) {
        event.preventDefault();
        props.add(title, favorite, date, rating);
        setTitle("");
        setFavorite(false);
        setDate(null);
        setRating(0);
        setSearchParams({ });
    }

    return (!searchParams.has("add")) ? (
        <tr>
            <td scope={"row"} style={{verticalAlign: "middle"}}></td>
            <td style={{verticalAlign: "middle"}}></td>
            <td className="text-center" style={{verticalAlign: "middle"}}></td>
            <td style={{verticalAlign: "middle"}}></td>
            <td style={{verticalAlign: "middle"}}></td>
            <td style={{verticalAlign: "middle"}} className={"text-center"}>
                <Container className={"d-inline-flex fluid justify-content-around"} style={{maxWidth: "8rem"}}>
                    <Button type="button" variant={"outline-primary"} onClick={() => {
                        setSearchParams({ "add" : "new".toString() });
                    }}>
                        <svg key={"save"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                            <path
                                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                        </svg>
                    </Button>
                </Container>
            </td>
        </tr>
    ) : (
        <tr>
                <td scope="row" className="text-center" style={{verticalAlign: "middle"}}><strong></strong></td>
                <td className="text-center" style={{verticalAlign: "middle"}}>
                    <Container className={"d-flex"}>
                        <Form.Control style={{display: "inline-block", textAlign: "center", width: "inherit"}} value={title.toString()}
                                  onChange={(event) => setTitle(event.target.value)}></Form.Control>
                    </Container>
                 </td>
                <td className="text-center" style={{verticalAlign: "middle"}}>
                    <Form.Check type="checkbox" id={`default-checkbox`} defaultChecked={false}
                                onChange={(event) => setFavorite(event.target.value === "on")}/></td>
                <td style={{verticalAlign: "middle"}}>
                    <Container className={"d-flex"}>
                        <Form.Control type={"date"} max={dayjs().format("YYYY-MM-DD")} style={{
                            height: "2rem",
                            display: "inline-block",
                            textAlign: "center"
                        }} onChange={(event) => setDate(event.target.value)}></Form.Control>
                    </Container>
                </td>
                <td style={{verticalAlign: "middle"}}>
                    <div className={"d-flex justify-content-center"}>
                        {
                            [...Array(5)].map((star, index) => {
                                index += 1;
                                return (rating < index) ?
                                    <svg key={index+"@added"+"E"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                         className="bi bi-star-fill form" viewBox="0 0 16 16" onClick={() => {
                                        setRating(index);
                                    }}>
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg> :
                                    <svg key={index+"@added"+"F"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                         className="bi bi-star-fill form" viewBox="0 0 16 16" onClick={() => {
                                        setRating(index);
                                    }} onDoubleClick={() => setRating(0)}>
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                            })
                        }
                    </div>
                </td>
                <td style={{verticalAlign: "middle"}} className={"text-center"}>
                    <Container className={"d-inline-flex fluid justify-content-around"} style={{maxWidth: "8rem"}}>
                        <Button type="submit" variant={"outline-success"} onClick={save}>
                            <svg key={"add"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-check2-square" viewBox="0 0 16 16">
                                <path
                                    d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                                <path
                                    d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                            </svg>
                        </Button>
                    </Container>
                </td>
            </tr>
    );
}

export default FilmForm;