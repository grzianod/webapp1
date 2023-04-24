import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Table} from "react-bootstrap";
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
                    <Form.Control style={{width: "14rem", height: "2rem", display: "inline-block", textAlign: "center"}} onChange={(event) => setTitle(event.target.value)}></Form.Control>
                </div>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} defaultChecked={false} onChange={(event) => setFavorite(event.target.value)}/></td>
            <td style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    <Form.Control type={"date"} style={{width: "14rem", height: "2rem", display: "inline-block", textAlign: "center"}} onChange={(event) => setDate(event.target.value)}></Form.Control>
                </div>
            </td>
            <td style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    {
                        [...Array(5)].map( (star, index) => {
                            return (rating < index) ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                     className="bi bi-star-fill" viewBox="0 0 16 16" onClick={() => { setRating(index);
                                } }>
                                    <path
                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                     className="bi bi-star-fill" viewBox="0 0 16 16" onClick={() => { setRating(index);
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
                    <Button type="submit" variant={"outline-primary"} onClick={save}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-clipboard-plus" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
                            <path
                                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path
                                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                    </Button>
                </div>
            </td>
        </>
    );
}

export default FilmForm;