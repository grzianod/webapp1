import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavBar.jsx";
import FilmTable from "./components/FilmTable.jsx";
import filmLibrary from "./components/FilmLibrary.jsx";
import {Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Route, Router, Routes, useParams} from "react-router-dom";
import FilmForm from "./components/FilmForm.jsx";

const filters = new Map();
filters.set("edit", "Edit");
filters.set("all", "All");
filters.set("favorites", "Favorites");
filters.set("bestrated", "Best Rated");
filters.set("seenlastmonth", "Seen Last Month");
filters.set("unseen", "Unseen");

function App() {
    const [films, setFilms] = useState(filmLibrary.getAll());
    const [alert, setAlert] = useState('');
    const {filter} = useParams();

    function updateFilms() {
        if (!filters.has(filter) || filter === "all") setFilms(filmLibrary.getAll());
        if (filter === "favorites") setFilms(filmLibrary.getFavorites());
        if (filter === "bestrated") setFilms(filmLibrary.getBestRated());
        if (filter === "seenlastmonth") setFilms(filmLibrary.getSeenLastMonth());
        if (filter === "unseen") setFilms(filmLibrary.getUnseen());
    }

    function changeFavorite(id) {
        filmLibrary.changeFavorite(id);
        updateFilms();
    }

    function changeRating(id, index) {
        filmLibrary.changeRating(id, index);
        updateFilms();
    }

    function deleteFilm(id) {
        filmLibrary.deleteFilm(id);
        updateFilms();
    }

    function modifyFilm(id, title, favorite, date, rating) {
        let flag = true;
        if (title === "") {
            setAlert("Title");
            flag = false;
            setTimeout(() => setAlert(''), 3000);
        }
        if (flag) {
            filmLibrary.modifyFilm(id, title, favorite, date, rating);
            updateFilms();
        }
    }

    function addFilm(id, title, favorites, date, rating) {
        let flag = true;
        if (!filmLibrary.checkID(id)) {
            setAlert("ID");
            flag = false;
            setTimeout(() => setAlert(''), 3000);
        }
        if (title === "") {
            setAlert("Title");
            flag = false;
            setTimeout(() => setAlert(''), 3000);
        }
        if (flag) {
            filmLibrary.addNewFilmByElements(id, title, favorites, date, rating);
            updateFilms();
        }
    }

    function deleteAll() {
        filmLibrary.deleteAll();
        updateFilms();
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/:filter' element={
                        <>
                            <NavigationBar/>
                            <FilmTable changeFavorite={changeFavorite}
                                       changeRating={changeRating} deleteFilm={deleteFilm} add={addFilm}
                                       modify={modifyFilm} delete={deleteAll}/>
                        </>
                    }/>
                    <Route path='/*' element={
                        <>
                            <NavigationBar/>
                            <FilmTable changeFavorite={changeFavorite}
                                       changeRating={changeRating} deleteFilm={deleteFilm} add={addFilm}
                                       modify={modifyFilm} delete={deleteAll}/>
                        </>
                    }/>
                </Routes>
            </BrowserRouter>
            { alert ? <Container className={"align-items-center d-flex justify-content-center fixed-bottom"}><Alert  className={"text-center"} style={{width: "50rem"}} value={alert} onClose={() => setAlert('')} variant="danger">{alert} not valid!</Alert></Container> : false }

        </>
    );

}

export {App, filters};