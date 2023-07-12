import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmRow from "./FilmRow.jsx"
import {Table} from "react-bootstrap";
import FilmForm from "./FilmForm.jsx";
import {useParams} from "react-router-dom";
import FilmError from "./FilmError.jsx";
import API from "../API.jsx";
import FilmLoading from "./FilmLoading.jsx";
import dayjs from "dayjs";

const filters = new Map();
filters.set("all", "All");
filters.set("favorites", "Favorites");
filters.set("bestrated", "Best Rated");
filters.set("seenlastmonth", "Seen Last Month");
filters.set("unseen", "Unseen");

function FilmTable(props) {
    const {filter} = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
    }, [filter]);

    useEffect( () => {
        if(loading) {
            setTimeout( () => {
                API.getFilms(filter)
                    .then((response) => {
                        if (response["error"]) {
                            setError(response["error"])
                            setLoading(false);
                        }
                        else {
                            setError(false);
                            setLoading(false);
                            console.log(response);
                            props.setFilms(response);
                        }
                    })
                    .catch((response) => setError(response["error"]));
            },500);
        }
    }, [loading]);

    function addFilm(title, favorite, date, rating) {
        API.addFilm(title, (favorite || false), dayjs(date).isValid() ? dayjs(date).format("YYYY-MM-DD") : null, rating,  1)
            .then( (response) => {
                if(response["error"]) {
                    setError(response["error"])
                }
                else {
                    setError(null);
                    setLoading(true);
                }
            })
            .catch((response) => setError(response["error"]));
    }

    function deleteFilm(id) {
        API.deleteFilm(id)
            .then( (response) => {
                if(response["error"]) {
                    setError(response["error"])
                }
                else {
                    setError(null);
                    setLoading(true);
                }
            })
            .catch((response) => setError(response["error"]));
    }

    function editFilm(id, title, favorite, date, rating) {
        API.editFilm(id, title, (favorite || false), (dayjs(date).isValid()) ? dayjs(date).format("YYYY-MM-DD") : null, rating)
            .then( (response) => {
                if(response["error"]) {
                    setError(response["error"])
                }
                else {
                    setError(null);
                    setLoading(true);
                }
            })
            .catch((response) => setError(response["error"]));
    }

    if( error ) return (<FilmError error={error}></FilmError>);

    if( !error && loading ) return (<FilmLoading></FilmLoading>);

    if ( !error && !loading )
        return (
        <>
            <div className={"row"}>
                <div className="col-lg-1 col-xl-2 col-md-1 col-sm-1 col-0"></div>
                <div className="col-lg-10 col-xl-8 col-md-10 col-sm-10 col-12">

                    <br/>
                    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0 ms-4">
                        <strong>
                            <li style={{fontSize: "2rem"}} className={"primary-text"}>{filters.get(filter)}</li>
                        </strong>
                    </ul>
                    <br/>

                    <Table className="table justify-content-center ms-3 primary-text" id="table">
                        <thead className="thead-dark-bg">
                        <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col" className="text-center">Title</th>
                            <th scope="col" className="text-center">Favorite</th>
                            <th scope="col" className="text-center">Watch Date</th>
                            <th scope="col" className="text-center">Rating</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody id="table_body">
                        { props.films.map((item) => <FilmRow
                            key={item.id}
                            item={item}
                            changeFavorite={props.changeFavorite}
                            changeRating={props.changeRating}
                            deleteFilm={deleteFilm}
                            modify={editFilm}/>) }
                        <FilmForm add={addFilm} delete={deleteFilm}></FilmForm>
                        </tbody>
                    </Table>


                </div>
                <div className="col-lg-1 col-xl-2 col-md-1 col-sm-1 col-0"></div>
            </div>
        </> );
}



export default FilmTable