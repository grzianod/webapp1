import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import './navbar.css'
import dayjs from "dayjs";
import {Button} from "react-bootstrap";
import StarRating from "react-bootstrap-star-rating";


function FilmRow(props) {
    const {item} = props;

    return (
        <tr>
            <th scope="row" className="text-center" style={{verticalAlign: "middle"}}>{props.index}</th>
            <td className="text-center" style={{verticalAlign: "middle"}}>{item.title}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} defaultChecked={item.favorites} onClick={() => { props.changeFavorite(item.id);}}/></td>
            <td className="text-center" style={{verticalAlign: "middle"}}>{dayjs(item.date).isValid() ? dayjs(item.date).format("MMMM D, YYYY").toString() : "Unwatched"}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                {
                    [...Array(5)].map( (star, index) => {
                        index+=1;
                        return (item.rating < index) ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#D3D3D3"
                                 className="bi bi-star-fill" viewBox="0 0 16 16" onClick={() => {
                                props.changeRating(item.id, index);
                            } }>
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E4BB67"
                                 className="bi bi-star-fill" viewBox="0 0 16 16" onDoubleClick={() => props.changeRating(item.id, 0)} onClick={() => {
                                props.changeRating(item.id, index);
                            } }>
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                    })
                }
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Button inputMode={"none"} variant={"outline-danger"} onClick={() => { props.deleteFilm(item.id) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </Button>
            </td>
        </tr>

    );
}

export default FilmRow