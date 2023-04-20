import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./NavBar.jsx";
import FilmTable from "./FilmTable.jsx";
import filmLibrary from "./FilmLibrary.jsx";

function App() {
    const [filter, setFilter] = useState("All");
    const [films, setFilms] = useState(filmLibrary.films);

    return (
        <>
            <NavigationBar setFilter={setFilter} setFilms={setFilms}></NavigationBar>
            <FilmTable films={films} filter={filter} setFilter={setFilter} setFilms={setFilms}></FilmTable>
        </>
    );

}

export default App