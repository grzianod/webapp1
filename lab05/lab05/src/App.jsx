import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./NavBar.jsx";
import FilmTable from "./Table.jsx";
import dayjs from "dayjs";
import filmLibrary from "./FilmLibrary.jsx";
import {Button} from "react-bootstrap";

function App() {

    return (
        <>
            <NavigationBar></NavigationBar>
            <FilmTable films={filmLibrary.films}></FilmTable>
            <Button variant={"primary"} style={{position: "absolute", bottom: "1rem", right: "1rem"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                     className="bi bi-plus" viewBox="0 0 16 16">
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </Button>
        </>
    );

}

export default App