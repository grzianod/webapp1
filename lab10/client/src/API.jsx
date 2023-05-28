
const URL = 'http://192.168.0.3:3002/api/films/';

async function getFilms(filter) {
    return new Promise( (resolve, reject) => {
        const response = fetch(URL + "filters/" + (filter || "all"))
            .then( async (response) => resolve(await response.json()))
            .catch( () => reject({error: "Unable to reach server"}));
    });
}

async function addFilm(title, favorite, watchdate, rating, userID) {
    return new Promise( (resolve, reject) => {
       const response = fetch(URL + "add", {
            method : "POST",
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, favorite: favorite, watchdate: watchdate, rating: rating, user: 1 }) })
           .then( (response) => {
               if (response.ok) {
                   resolve(response.json())
               }
               else {
                   response.json()
                       .then( () => reject({ error: "Invalid field value" }))
                       .catch(() => reject({ error: "Cannot parse server response" }));
               }
           })
           .catch( () => reject({error: "Unable to reach server"}));
    });
}

async function deleteFilm(id) {
    return new Promise( (resolve, reject) => {
        const response = fetch(URL + id.toString(), {
            method: "DELETE",
            headers : { 'Content-Type': 'application/json' }
            })
            .then( async (response) => resolve({}))
            .catch( () => reject({error: "Unable to reach server"}));
    });
}

async function editFilm(id, title, favorite, watchdate, rating) {
    return new Promise( (resolve, reject) => {
        const response = fetch(URL + `update/${id}`, {
            method : "PUT",
            headers : { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, favorite: favorite, watchdate: watchdate, rating: rating, user: 1 }) })
            .then( (response) => {
                if (response.ok) {
                    resolve(response.json())
                }
                else {
                    response.json()
                        .then( () => reject({error: "Invalid field format"}))
                        .catch(() => reject({ error: "Cannot parse server response" }));
                }
            })
            .catch( () => reject({error: "Unable to reach server"}));
    });
}

const API = {getFilms, addFilm, deleteFilm, editFilm}
export default API;