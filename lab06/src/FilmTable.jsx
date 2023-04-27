import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmRow from "./FilmRow.jsx"
import {Table} from "react-bootstrap";
import FilmForm  from "./FilmForm.jsx";
function FilmTable(props) {
    const {filter} = props;
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className={"row"}>
                <div className="col-lg-1 col-xl-2 col-md-1 col-sm-1 col-1"></div>
                <div className="col-lg-10 col-xl-8 col-md-10 col-sm-10 col-10">

                    <br/>
                    <ul className="nav col-lg-auto me-lg-auto mb-2 mb-md-0">
                        <strong>
                            <li style={{fontSize: "2rem", color: "#2F3B50"}} id="main_title">{ props.filter }</li>
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
                        { props.films.map((item, index) => <FilmRow key={item.id} index={index+1} item={item} changeFavorite={props.changeFavorite} changeRating={props.changeRating} deleteFilm={props.deleteFilm} modify={props.modify}/>) }
                        <FilmForm show={showForm} setShow={setShowForm} add={props.add} delete={props.delete}></FilmForm>
                        </tbody>
                    </Table>


                </div>
                <div className="col-lg-1 col-xl-2 col-md-1 col-sm-1 col-1"></div>
            </div>
        </>
    )
        ;
}

export default FilmTable