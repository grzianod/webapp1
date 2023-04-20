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
            <th scope="row" className="text-center" style={{verticalAlign: "middle"}}>{item.id}</th>
            <td className="text-center" style={{verticalAlign: "middle"}}>{item.title}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Form.Check type="checkbox" id={`default-checkbox`} defaultChecked={item.favorites} onClick={() => { props.changeFavorite(item.id); item.favorites = !item.favorites;}}/></td>
            <td className="text-center" style={{verticalAlign: "middle"}}>{dayjs(item.date).isValid() ? dayjs(item.date).format("MMMM D, YYYY").toString() : "Unwatched"}</td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                {
                    [...Array(5)].map( (star, index) => {
                        return <svg onClick={() => {
                                            props.changeRating(item.id, index);

                        } } type="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-star" viewBox="0 0 16 16">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                    })
                }
            </td>
            <td className="text-center" style={{verticalAlign: "middle"}}>
                <Button inputMode={"none"} variant={"danger"}>
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