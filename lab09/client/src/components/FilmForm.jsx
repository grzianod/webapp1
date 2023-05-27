import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import filmLibrary from "./FilmLibrary.jsx";
import Container from "react-bootstrap/Container";
import {useSearchParams} from "react-router-dom";
import dayjs from "dayjs";

function FilmForm(props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [id, setID] = useState((searchParams.has("add") && filmLibrary.checkID(parseInt(searchParams.get("add")))) ? searchParams.get("add") : filmLibrary.suggestedID());
    const [title, setTitle] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState(null);
    const [rating, setRating] = useState(0);

    function save(event) {
        event.preventDefault();
        props.add(id, title, favorite, date, rating);
        setID(filmLibrary.suggestedID());
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
                        setSearchParams({ "add" : id.toString() });
                    }}>
                        <svg key={"save"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                            <path
                                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                        </svg>
                    </Button>
                    <Button inputMode={"none"} type={"button"} variant={"outline-danger"} onClick={() => {props.delete(); setID(filmLibrary.suggestedID());}}>
                        <svg key={"deleteAllHidden"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-database-x" viewBox="0 0 16 16">
                            <path
                                d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
                            <path
                                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/>
                        </svg>
                    </Button>
                </Container>
            </td>
        </tr>
    ) : (
        <tr>
                <td scope="row" className="text-center" style={{verticalAlign: "middle"}}><strong>{id}</strong></td>
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
                                    <svg key={index+"@added"+id+"E"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                         className="bi bi-star-fill form" viewBox="0 0 16 16" onClick={() => {
                                        setRating(index);
                                    }}>
                                        <path
                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg> :
                                    <svg key={index+"@added"+id+"F"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
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
                        <Button style={{visibility: "hidden"}}>
                            <svg key={"deleteAllHidden"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-save2" viewBox="0 0 16 16">
                                <path
                                    d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                            </svg>
                        </Button>
                    </Container>
                </td>
            </tr>
    );
}

export default FilmForm;