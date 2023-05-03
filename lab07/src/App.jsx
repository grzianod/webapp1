import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./NavBar.jsx";
import FilmTable from "./FilmTable.jsx";
import filmLibrary from "./FilmLibrary.jsx";
import {Alert} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function App() {
    const [filter, setFilter] = useState("All");
    const [films, setFilms] = useState(filmLibrary.getAll());
    const [alert, setAlert] = useState('');

    function setContext() {
        if(filter === "All")
            setFilms(filmLibrary.getAll());
        if(filter === "Favorites")
            setFilms(filmLibrary.getFavorites());
        if(filter === "Best Rated")
            setFilms(filmLibrary.getBestRated());
        if(filter === "Seen Last Month")
            setFilms(filmLibrary.getSeenLastMonth());
        if(filter === "Unseen")
            setFilms(filmLibrary.getUnseen());
    }

    function changeFavorite(id) {
        filmLibrary.changeFavorite(id);
        setContext();
    }

    function changeRating(id, index) {
        filmLibrary.changeRating(id, index);
        setContext();
    }

    function deleteFilm(id) {
        filmLibrary.deleteFilm(id);
        setContext();
    }

    function modifyFilm(id, title, favorite, date, rating) {
        let flag = true;
        if(title === "") {
            setAlert("Title");
            flag = false;
            setTimeout(() => setAlert(''), 3000);
        }
        if(flag) {
            filmLibrary.modifyFilm(id, title, favorite, date, rating);
            setContext();
        }
    }

    function addFilm(id, title, favorites, date, rating) {
        let flag = true;
        if(!filmLibrary.checkID(id)) {
            setAlert("ID");
            flag = false;
            setTimeout(() => setAlert(''), 3000);
        }
        if(title === "") {
            setAlert("Title");
            flag = false;
            setTimeout(() => setAlert(''), 3000);
        }
        if(flag) {
            filmLibrary.addNewFilmByElements(id, title, favorites, date, rating);
            setContext();
        }
    }

    function deleteAll() {
        filmLibrary.deleteAll();
        setContext();
    }

    return (
        <>
            <NavigationBar filter={filter} setFilter={setFilter} films={films} setFilms={setFilms}></NavigationBar>
            <FilmTable films={films} filter={filter} setFilter={setFilter} setFilms={setFilms} changeFavorite={changeFavorite} changeRating={changeRating} deleteFilm={deleteFilm} add={addFilm} modify={modifyFilm} delete={deleteAll}></FilmTable>
            { alert ? <Container className={"align-items-center d-flex justify-content-center fixed-bottom"}><Alert  className={"text-center"} style={{width: "50rem"}} value={alert} onClose={() => setAlert('')} variant="danger">{alert} not valid!</Alert></Container> : false }
        </>
    );

}

export default App