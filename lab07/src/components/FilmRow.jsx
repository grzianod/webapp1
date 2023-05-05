import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import '../../navbar.css'
import dayjs from "dayjs";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useSearchParams} from "react-router-dom";



function FilmRow(props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const {item} = props;
    const [title, setTitle] = useState(item.title);
    const [favorite, setFavorite] = useState(item.favorites);
    const [date, setDate] = useState(item.date);
    const [rating, setRating] = useState(item.rating);

    return (searchParams.has("edit") && parseInt(searchParams.get("edit")) === props.item.id) ? (
        <tr>
            <td scope="row" className="text-center" style={{verticalAlign: "middle"}}><strong>{props.item.id}</strong>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Container className={"d-flex"}>
                    <Form.Control style={{display: "inline-block", textAlign: "center"}} value={title.toString()}
                                  onChange={(event) => setTitle(event.target.value)}></Form.Control>
                </Container>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} defaultChecked={favorite} value={favorite}
                            onClick={() => {
                                setFavorite(!favorite);
                            }}/></td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Container className={"d-flex"}>
                    <Form.Control max={dayjs().format("YYYY-MM-DD")} type={"date"}
                                  style={{display: "inline-block", textAlign: "center"}}
                                  value={dayjs(date).format("YYYY-MM-DD")}
                                  onChange={(event) => setDate(event.target.value)}></Form.Control>
                </Container>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                {
                    [...Array(5)].map((star, index) => {
                        index += 1;
                        return (item.rating < index) ?
                            <svg key={index+"@"+props.item.id+"E"} type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                 className="bi bi-star-fill form null" viewBox="0 0 16 16" onClick={() => {
                                setRating(index);
                                props.changeRating(item.id, index);
                            }}>
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg> :
                            <svg key={index+"@"+props.item.id+"F"} type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                 className="bi bi-star-fill form gold" viewBox="0 0 16 16" onDoubleClick={() => {
                                props.changeRating(item.id, 0);
                                setRating(0);
                            }} onClick={() => {
                                props.changeRating(item.id, index);
                                setRating(index);
                            }}>
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                    })
                }
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Container className={"d-inline-flex fluid justify-content-around"} style={{maxWidth: "8rem"}}>
                    <Button inputMode={"none"} type={"button"} variant={"outline-success"} onClick={() => {
                        props.modify(item.id, title, favorite, date, rating);
                        if (title === "")
                            setTitle(item.title);
                        setSearchParams({});
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-check2-square" viewBox="0 0 16 16">
                            <path
                                d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                            <path
                                d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                        </svg>
                    </Button>
                    <Button inputMode={"none"} type={"button"} variant={"outline-danger"} onClick={() => {
                        props.deleteFilm(item.id)
                    }}>
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
            <td scope="row" className="text-center" style={{verticalAlign: "middle"}}><strong>{props.item.id}</strong>
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>{item.title}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} disabled defaultChecked={item.favorites}/></td>
            <td className="text-center"
                style={{verticalAlign: "middle"}}>{dayjs(item.date).isValid() ? dayjs(item.date).format("MMMM D, YYYY").toString() : "Unwatched"}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                {
                    [...Array(5)].map((star, index) => {
                        index += 1;
                        return (item.rating < index) ?
                            <svg key={index+"@"+props.item.id+"E"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                 className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg> :
                            <svg key={index+"@"+props.item.id+"F"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                 className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                    })
                }
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}} >
                <Container className={"d-inline-flex fluid justify-content-around"} style={{maxWidth: "8rem"}}>
                    <Button variant="outline-primary"
                            onClick={() => setSearchParams({"edit": props.item.id.toString()})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={"currentColor"}
                             className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </Button>
                    <Button variant={"outline-danger"} onClick={() => {
                        props.deleteFilm(item.id)
                    }}>
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