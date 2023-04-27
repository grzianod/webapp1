import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import filmLibrary from "./FilmLibrary.jsx";

function FilmForm(props) {
    const [id, setID] = useState(filmLibrary.suggestedID());
    const [title, setTitle] = useState("");
    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState(null);
    const [rating, setRating] = useState(0);

    function save(event) {
        event.preventDefault();
        props.setShow(false);
        props.add(id, title, favorite, date, rating);
        setID(filmLibrary.suggestedID());
        setTitle("");
        setFavorite(false);
        setDate(null);
        setRating(0);
    }

    return (props.show === false) ? (
        <>
            <th scope={"row"} style={{verticalAlign: "middle"}}></th>
            <td style={{verticalAlign: "middle"}}></td>
            <td className="text-center" style={{verticalAlign: "middle"}}></td>
            <td style={{verticalAlign: "middle"}}></td>
            <td style={{verticalAlign: "middle"}}></td>
            <td style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    <Button type="button" variant={"outline-primary"} onClick={() => {
                        props.setShow(true);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path
                                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </Button>
                </div>
            </td>
        </>
    ) : (
        <>
            <th scope="row" className="text-center" style={{verticalAlign: "middle"}}>{id}</th>
            <td style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    <Form.Control style={{maxWidth: "12rem", height: "2rem", display: "inline-block", textAlign: "center"}} onChange={(event) => setTitle(event.target.value)}></Form.Control>
                </div>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} defaultChecked={false} onChange={(event) => setFavorite(event.target.value === "on")}/></td>
            <td style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    <Form.Control type={"date"} style={{maxWidth: "10rem", height: "2rem", display: "inline-block", textAlign: "center"}} onChange={(event) => setDate(event.target.value)}></Form.Control>
                </div>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    {
                        [...Array(5)].map( (star, index) => {
                            return (rating < index) ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                     className="bi bi-star-fill form" viewBox="0 0 16 16" onClick={() => { setRating(index);
                                } }>
                                    <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                     className="bi bi-star-fill form" viewBox="0 0 16 16" onClick={() => { setRating(index);
                                } }>
                                    <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                        })
                    }
                </div>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    <Button type="submit" variant={"primary"} onClick={save}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                            <path
                                d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
                            <path
                                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                        </svg>
                    </Button>
                </div>
            </td>
        </>
    );
}

export default FilmForm;