import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmRow from "./FilmRow.jsx"
import {Table} from "react-bootstrap";
import FilmForm from "./FilmForm.jsx";
import {useParams, useSearchParams} from "react-router-dom";
import FilmError from "./FilmError.jsx";

const filters = new Map();
filters.set("all", "All");
filters.set("favorites", "Favorites");
filters.set("bestrated", "Best Rated");
filters.set("seenlastmonth", "Seen Last Month");
filters.set("unseen", "Unseen");

function FilmTable(props) {
    const {filter} = useParams();
    const [error, setError] = useState("");

    useEffect( () => {
        const fetchFilms = async () => {
            const films = fetch("http://localhost:3002/api/films/filters/" + (filter || "all"))
                .then ( async (response) => {
                    if(response.ok) {
                        setError(null);
                        const films = await response.json();
                        props.setFilms(films);
                    }
                    else {
                        const error = await response.json();
                        setError(error.error);
                    }
                } )
                .catch((err) => { setError("Cannot Reach Server"); console.log(err);})
        }
        fetchFilms();
    }, [filter]);

    return ( (!error) ?
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
                            deleteFilm={props.deleteFilm}
                            modify={props.modify}/>) }
                        {/*<FilmForm add={props.add} delete={props.delete}></FilmForm>*/}
                        </tbody>
                    </Table>


                </div>
                <div className="col-lg-1 col-xl-2 col-md-1 col-sm-1 col-0"></div>
            </div>
        </> :
        <FilmError error={error}></FilmError>);
}

export default FilmTable