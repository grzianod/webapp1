import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./NavBar.jsx";
import FilmTable from "./FilmTable.jsx";
import filmLibrary from "./FilmLibrary.jsx";

function App() {
    const [filter, setFilter] = useState("All");
    const [films, setFilms] = useState(filmLibrary.films);

    function changeFavorite(id) {
        filmLibrary.changeFavorite(id);
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

    function changeRating(id, index) {
        filmLibrary.changeRating(id, index);
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

    function deleteFilm(id) {
        filmLibrary.deleteFilm(id);
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

    return (
        <>
            <NavigationBar filter={filter} setFilter={setFilter} films={films} setFilms={setFilms}></NavigationBar>
            <FilmTable films={films} filter={filter} setFilter={setFilter} setFilms={setFilms} changeFavorite={changeFavorite} changeRating={changeRating} deleteFilm={deleteFilm}></FilmTable>
        </>
    );

}

export default App