import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavBar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login.jsx";
import {Welcome} from "./components/Welcome.jsx";
import Booking from "./components/Booking.jsx";
import API from "./API.jsx";
import Loading from "./components/Loading.jsx";
import Error from "./components/Error.jsx";
import isEmpty from "validator/es/lib/isEmpty.js";

function Flight(type, variant, color, lines, seats) {
    this.type = type;
    this.variant = variant;
    this.color = color;
    this.lines = lines;
    this.seats = seats;
}

function App() {
    const [user, setUser] = useState(undefined);
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [flights, setFlights] = useState(new Map());

    const variants = ["success", "danger", "dark", "primary"];
    const colors = ["#198754", "#dc3545", "#212529", "#0e6efd"];

    useEffect( () => setLoading(true), []);

    useEffect(()=> {
            const checkAuth = async () => {
                try {
                    // here you have the user info, if already logged in
                    const user = await API.getUserInfo();
                    setLogin(true);
                    setUser(user);
                } catch (err) {
                    //no need to do anything
                }
            };

            if(loading) {
                checkAuth();


                API.getFlights()
                    .then((response) => {

                        if (response["error"])
                            setError(response["error"]);
                        else if (response.length === 0)
                            setError("No Flights Found");
                        else {
                            const f = new Map();

                            response.forEach( (flight, i) =>
                                f.set(response[i].type, new Flight(response[i].type, variants[i % variants.length], colors[i % colors.length], response[i].lines, response[i].seats)));

                            setFlights(f);
                            setError(false);
                        }
                    })
                    .catch((response) => setError(response["error"]))
                    .finally(() => setLoading(false));
            }
    }, [loading]);



    if (error) return (<Error error={error}></Error>);

    if (!error && loading) return (<Loading></Loading>);

    if(!error && !loading && flights.size > 0) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/seats/:plane' element={
                        <>
                            <NavigationBar flights={flights} login={login} user={user} setLogin={setLogin} setUser={setUser}/>
                            <Booking flights={flights} login={login} user={user}></Booking>
                        </>
                    }/>
                    <Route path='/login' element={
                        <>
                            <NavigationBar flights={flights} login={login} user={user} setLogin={setLogin} setUser={setUser}/>
                            <Login setUser={setUser} setLogin={setLogin}></Login>
                        </>
                    }/>
                    <Route path='/*' element={
                        <>
                            <NavigationBar flights={flights} login={login} user={user} setLogin={setLogin} setUser={setUser}/>
                            <Welcome flights={flights} user={user} login={login}></Welcome>
                        </>
                    }/>

                </Routes>
            </BrowserRouter>
        </>
    )}

}


export default App;
