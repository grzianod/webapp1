import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmRow from "./FilmRow.jsx"
import {Table} from "react-bootstrap";
import FilmForm from "./FilmForm.jsx";
import {useParams} from "react-router-dom";
import filmLibrary from "./FilmLibrary.jsx";

const filters = new Map();
filters.set("all", "All");
filters.set("favorites", "Favorites");
filters.set("bestrated", "Best Rated");
filters.set("seenlastmonth", "Seen Last Month");
filters.set("unseen", "Unseen");

function FilmTable(props) {
    const {filter} = useParams();

    return (
        <>
            <div className={"row"}>
                <div className="col-lg-1 col-xl-2 col-md-1 col-sm-1 col-0"></div>
                <div className="col-lg-10 col-xl-8 col-md-10 col-sm-10 col-12">

                    <br/>
                    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0 ms-4">
                        <strong>
                            <li style={{fontSize: "2rem", color: "#2F3B50"}}
                                id="main_title">{(filters.has(filter)) ? filters.get(filter) : "All"}</li>
                        </strong>
                    </ul>
                    <br/>

                    <Table className="table justify-content-center" id="table">
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
                        {(!filters.has(filter) || filter === "all") ? filmLibrary.getAll().map((item) => <FilmRow
                            key={item.id} item={item} changeFavorite={props.changeFavorite}
                            changeRating={props.changeRating} deleteFilm={props.deleteFilm}
                            modify={props.modify}/>) : false}
                        {(filter === "favorites") ? filmLibrary.getFavorites().map((item) => <FilmRow
                            key={item.id} item={item} changeFavorite={props.changeFavorite}
                            changeRating={props.changeRating} deleteFilm={props.deleteFilm}
                            modify={props.modify}/>) : false}
                        {(filter === "bestrated") ? filmLibrary.getBestRated().map((item) => <FilmRow
                            key={item.id} item={item} changeFavorite={props.changeFavorite}
                            changeRating={props.changeRating} deleteFilm={props.deleteFilm}
                            modify={props.modify}/>) : false}
                        {(filter === "seenlastmonth") ? filmLibrary.getSeenLastMonth().map((item) => <FilmRow
                            key={item.id} item={item} changeFavorite={props.changeFavorite}
                            changeRating={props.changeRating} deleteFilm={props.deleteFilm}
                            modify={props.modify}/>) : false}
                        {(filter === "unseen") ? filmLibrary.getUnseen().map((item) => <FilmRow key={item.id}
                                                                                                       item={item}
                                                                                                       changeFavorite={props.changeFavorite}
                                                                                                       changeRating={props.changeRating}
                                                                                                       deleteFilm={props.deleteFilm}
                                                                                                       modify={props.modify}/>) : false}
                        <FilmForm add={props.add} delete={props.delete}></FilmForm>
                        </tbody>
                    </Table>


                </div>
                <div className="col-lg-1 col-xl-2 col-md-1 col-sm-1 col-0"></div>
            </div>
        </>
    )
        ;
}

export default FilmTable