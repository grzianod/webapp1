import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavBar.jsx";
import FilmTable from "./components/FilmTable.jsx";
import FilmError from "./components/FilmError.jsx";
import {Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const filters = new Map();
filters.set("edit", "Edit");
filters.set("all", "All");
filters.set("favorites", "Favorites");
filters.set("bestrated", "Best Rated");
filters.set("seenlastmonth", "Seen Last Month");
filters.set("unseen", "Unseen");

function App() {
    const [films, setFilms] = useState([]);
    const [alert, setAlert] = useState('');


    function changeFavorite(id) {
        // filmLibrary.changeFavorite(id);
        // updateFilms();
    }

    function changeRating(id, index) {
        // filmLibrary.changeRating(id, index);
        // updateFilms();
    }

    function deleteFilm(id) {
        // filmLibrary.deleteFilm(id);
        // updateFilms();
    }

    function modifyFilm(id, title, favorite, date, rating) {
        // let flag = true;
        // if (title === "") {
        //     setAlert("Title");
        //     flag = false;
        //     setTimeout(() => setAlert(''), 3000);
        // }
        // if (flag) {
        //     filmLibrary.modifyFilm(id, title, favorite, date, rating);
        //     updateFilms();
        // }
    }

    function addFilm(id, title, favorites, date, rating) {
        // let flag = true;
        // if (!filmLibrary.checkID(id)) {
        //     setAlert("ID");
        //     flag = false;
        //     setTimeout(() => setAlert(''), 3000);
        // }
        // if (title === "") {
        //     setAlert("Title");
        //     flag = false;
        //     setTimeout(() => setAlert(''), 3000);
        // }
        // if (flag) {
        //     filmLibrary.addNewFilmByElements(id, title, favorites, date, rating);
        //     updateFilms();
        // }
    }

    function deleteAll() {
        //filmLibrary.deleteAll();
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/:filter' element={
                        <>
                            <NavigationBar/>
                            <FilmTable films={films} setFilms={setFilms} changeFavorite={changeFavorite}
                                       changeRating={changeRating} deleteFilm={deleteFilm} add={addFilm}
                                       modify={modifyFilm} delete={deleteAll}/>
                        </>
                    }/>
                    <Route path='/*' element={
                        <>
                            <NavigationBar />
                            <FilmTable films={films} setFilms={setFilms} changeFavorite={changeFavorite}
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