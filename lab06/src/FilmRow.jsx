import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import './navbar.css'
import dayjs from "dayjs";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";


function FilmRow(props) {
    const {item} = props;
    const [form, setForm] = useState(false);
    const [title, setTitle] = useState(item.title);
    const [favorite, setFavorite] = useState(item.favorites);
    const [date, setDate] = useState(item.date);
    const [rating, setRating] = useState(item.rating);

    return (form === true) ? (
        <tr>
            <th scope="row" className="text-center" style={{verticalAlign: "middle"}}>{props.index}</th>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    <Form.Control style={{maxWidth: "12rem", height: "2rem", display: "inline-block", textAlign: "center"}} value={title} onChange={(event) => setTitle(event.target.value)}></Form.Control>
                </div>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} defaultChecked={favorite} value={favorite} onClick={(event) => { setFavorite(!favorite); }}/></td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <div className={"d-flex justify-content-center"}>
                    <Form.Control type={"date"} style={{maxWidth: "10rem", height: "2rem", display: "inline-block", textAlign: "center"}} value={dayjs(date).format("YYYY-MM-DD")} onChange={(event) => setDate(event.target.value)}></Form.Control>
                </div>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                {
                    [...Array(5)].map( (star, index) => {
                        index+=1;
                        return (item.rating < index) ?
                            <svg type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                 className="bi bi-star-fill form null" viewBox="0 0 16 16" onClick={() => {
                                     setRating(index);
                                props.changeRating(item.id, index);
                            } }>
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg> :
                            <svg type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                 className="bi bi-star-fill form gold" viewBox="0 0 16 16" onDoubleClick={() => {
                                     props.changeRating(item.id, 0);
                                    setRating(0);
                                 }} onClick={() => {
                                props.changeRating(item.id, index);
                                setRating(index);
                            } }>
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                    })
                }
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Container className={"justify-content-between"}>
                <Button className={"me-2"} inputMode={"none"} type={"button"} variant={"primary"} onClick={() => {
                    props.modify(item.id, title, favorite, date, rating);
                    if(title === "")
                        setTitle(item.title);
                    setForm(false); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                        <path
                            d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
                        <path
                            d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>
                </Button>
                    <Button inputMode={"none"} type={"button"} variant={"outline-danger"} onClick={() => { props.deleteFilm(item.id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                    </Button>
                </Container>
            </td>
        </tr>
    ) : (
        <tr>
            <th scope="row" className="text-center" style={{verticalAlign: "middle"}}>{props.index}</th>
            <td className="text-center" style={{verticalAlign: "middle", minWidth: "13rem"}}>{item.title}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} disabled defaultChecked={item.favorites}/></td>
            <td className="text-center" style={{verticalAlign: "middle", minWidth: "12rem"}}>{dayjs(item.date).isValid() ? dayjs(item.date).format("MMMM D, YYYY").toString() : "Unwatched"}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                {
                    [...Array(5)].map( (star, index) => {
                        index+=1;
                        return (item.rating < index) ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                 className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                 className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                    })
                }
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Container className={"justify-content-between"} style={{minWidth: "7.3rem"}}>
                    <Button className={"me-2"} variant="outline-primary" onClick={() => setForm(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-file-earmark-font" viewBox="0 0 16 16">
                            <path
                                d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"/>
                            <path
                                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                        </svg>
                    </Button>
                    <Button variant={"outline-danger"} onClick={() => { props.deleteFilm(item.id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                    </Button>
                </Container>
            </td>
        </tr>
    );
}

export default FilmRow