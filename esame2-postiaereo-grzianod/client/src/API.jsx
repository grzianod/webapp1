const URL = 'http://localhost:3002/api/';


async function login(credentials) {
    let response = await fetch(URL + 'booking/sessions', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json();
        return user;
    } else {
        const errDetail = await response.json();
        throw errDetail.message;
    }
}

async function logout() {
    await fetch(URL+'booking/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    });
}

async function getUserInfo() {
    const response = await fetch(URL+'booking/sessions/current', {
        credentials: 'include'
    });
    const userInfo = await response.json();
    if (response.ok) {
        return userInfo;
    } else {
        throw userInfo;  // an object with the error coming from the server
    }
}

async function getFlights() {
    return new Promise((resolve, reject) => {
        fetch(URL + "seats")
            .then(async (response) => {
                if (response.status === 204) {
                    resolve([]);
                } else {
                    resolve(await response.json());
                }
            })
            .catch(() => reject({ error: "Unable to Reach Server" }));
    });
}


async function getBookedSeats(type) {
    return new Promise( (resolve, reject) => {
        fetch(URL + "booking/seats/" + type + "/booked")
            .then( async (response) => resolve(await response.json()))
            .catch( () => reject({error: "Unable to Reach Server"}));
    });
}

async function getReservedSeats(type) {
    return new Promise( (resolve, reject) => {
        fetch(URL + "booking/seats/" + type + "/reserved", { credentials: 'include' })
            .then( async (response) => resolve(await response.json()))
            .catch( () => reject({error: "Unable to Reach Server"}));
    });
}

async function deleteBooking(type) {
    return new Promise((resolve, reject) => {
        fetch(URL + "booking/seats/" + type + "/reserved", { method: "DELETE", credentials: 'include' })
            .then(async (response) => {
                if (response.ok) {
                    resolve([]);
                } else {
                    reject(response);
                }
            })
            .catch(() => reject({ error: "Unable to Reach Server" }));
    });
}

async function addReservation(type, selectedSeats) {
    return new Promise( (resolve, reject) => {
        fetch(URL + "booking/seats/" + type,
            {
                method : "POST",
                credentials: 'include',
                headers : { 'Content-Type': 'application/json' },
                body: JSON.stringify({ seats: selectedSeats.map( (seat) => ({seat: seat})) })
            })
            .then( async (response) => resolve(await response.json()))
            .catch( () => reject({error: "Unable to Reach Server"}));
    });
}


const API = {login, logout, getUserInfo, getFlights, getBookedSeats, getReservedSeats, deleteBooking, addReservation}
export default API;