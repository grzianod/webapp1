import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmRow from "./FilmRow.jsx"
import FilmLibrary from "./FilmLibrary.jsx";
import Film from "./FilmLibrary.jsx";

function FilmTable(props) {
    const [list, setList] = useState(props.films)

    return (
        <>
            <div className={"row"}>
                <div className="col-lg-2 col-xl-2 col-md-1 col-sm-1 col-1"></div>
                <div className="col-lg-8 col-xl-8 col-md-10 col-sm-10 col-10">

                    <br/>
                    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0">
                        <strong>
                            <li style={{fontSize: "2rem", color: "#2F3B50"}} id="main_title">All</li>
                        </strong>
                    </ul>
                    <br/>

                    <table className="table justify-content-center" id="table">
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
                        { list.map((item) => <FilmRow key={item.id} item={item} />) }
                        </tbody>
                    </table>


                </div>
                <div className="col-lg-2 col-xl-2 col-md-1 col-sm-1 col-1"></div>
            </div>
        </>
    )
        ;
}

export default FilmTable