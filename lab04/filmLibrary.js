
function Film(id, title, favorites = false, date, rating ) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date ?? null;
    this.rating = rating ?? null;

    this.toString = () => `ID: ${this.id} Title: ${this.title} Favorite: ${this.favorites} Watch Date: ${this.date ? this.date.format("YYYY-MM-DD") : "Unwatched"} Rating: ${this.rating ? this.rating : "Unrated"}`;
}

function FilmLibrary(films) {
    this.films = films ?? [];

    this.addNewFilm = function (film) {
        this.films.push(film);
    }

    this.sortByDate = function() {
        return [...this.films].sort((a,b) => {
            if(a.date && !b.date) return -1;
            if(!a.date && b.date) return 1;
            if(!a.date && !b.date) return 0;
            return a.date.diff(b.date);
        });
    }

    this.favoriteFilms = function() {
        return [...this.films].filter( item => item.favorites );
    }

    this.deleteFilm = function(id) {
        this.films = this.films.filter( item => item.id != id );
    }

    this.resetWatchedFilms = function() {
        this.films = this.films.forEach(item => item.date = null );
    }

    this.getRated = function() {
        return [...this.films].sort((a,b) => b.rating-a.rating);
    }

    this.seenLastMonth = function() {
        let now = dayjs();
        return [...this.films].filter( item => {
            if( item.date != null && item.date.diff(now, "months") >= 0)
                return 1;
            return 0;
        });
    }

    this.unseen = function() {
        return [...this.films].filter( item => item.date == null );
    }

    this.setRating = function(id, rating) {
        this.films.forEach( film => {
           if(film.id == id) film.rating = rating;
        });
    }

    this.setFavorite = function(id, favorite) {
        console.log(id);
        this.films.forEach( film => {
            if(film.id == id) {
                film.favorites = favorite;
                console.log(film);
            }
        });
    }

    this.toString = () => this.films.reduce((acc, curr) => acc + curr + "\n", "");

    this.populateHTML = function(all) {
        let table = document.getElementById("table");

        let body = document.querySelector('tbody');
        while(body.firstChild)
            body.removeChild(body.firstChild);

        for(let film of all) {
            let newRow = document.createElement("tr");
            newRow.setAttribute("class", "film");

            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.setAttribute("class", "text-center");
            th.textContent = film.id;
            newRow.appendChild(th);

            let td = document.createElement("td");
            td.setAttribute("class", "text-center");
            td.textContent = film.title;
            newRow.appendChild(td);

            td = document.createElement("td");
            td.setAttribute("class", "text-center");
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("class", "form-check-input favCheckbox");
            input.setAttribute("style", "background-color: #2F3B50;");
            input.checked = film.favorites;
            td.appendChild(input);
            newRow.appendChild(td);

            td = document.createElement("td");
            td.setAttribute("class", "text-center");
            if(film.date) td.textContent = film.date.format("YYYY-MM-DD");
            else td.textContent = "Unwatched";
            newRow.appendChild(td);

            td = document.createElement("td");
            td.setAttribute("class", "text-center");
            film.rating = film.rating || 0;
            td.innerHTML = "<div class=\"rating\">\n" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-star bi-star-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n" +
                "</svg>\n" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-star bi-star-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n" +
                "</svg>\n" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-star bi-star-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n" +
                "</svg>\n" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-star bi-star-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n" +
                "</svg>\n" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-star bi-star-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n" +
                "</svg>\n" +
                "</div>";
            newRow.appendChild(td);
            updateRating(newRow, film.rating);

            td = document.createElement("td");
            td.setAttribute("class", "text-center");
            td.innerHTML = "<button class=\"btn btn-primary rounded-square trash\" style=\"background-color: #2F3B50;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z\"/>\n" +
                "</svg></button>";
            newRow.appendChild(td);
            table.getElementsByTagName("tbody")[0].appendChild(newRow);
        }
    }

    this.switchContext = function(context) {

        let filters = document.querySelectorAll(".filter");
        filters.forEach( item => {
            item.setAttribute("class", "nav-link link-dark");
            item.removeAttribute("style");
        });

        if(context === "All") {
            this.populateHTML(this.films);
            document.getElementById("allFilter").setAttribute("class", "nav-link active filter");
            document.getElementById("allFilter").setAttribute("style", "background-color: #2F3B50;");
            document.getElementById("allFilterC").setAttribute("class", "nav-link active filter");
            document.getElementById("allFilterC").setAttribute("style", "background-color: #2F3B50;");

        }
        if(context === "Favorites") {
            this.populateHTML(this.favoriteFilms());
            document.getElementById("favoriteFilter").setAttribute("class", "nav-link active filter");
            document.getElementById("favoriteFilter").setAttribute("style", "background-color: #2F3B50;");
            document.getElementById("favoriteFilterC").setAttribute("class", "nav-link active filter");
            document.getElementById("favoriteFilterC").setAttribute("style", "background-color: #2F3B50;");

        }
        if(context === "Best Rated") {
            this.populateHTML(this.getRated());
            document.getElementById("bestFilter").setAttribute("class", "nav-link active filter");
            document.getElementById("bestFilter").setAttribute("style", "background-color: #2F3B50;");
            document.getElementById("bestFilterC").setAttribute("class", "nav-link active filter");
            document.getElementById("bestFilterC").setAttribute("style", "background-color: #2F3B50;");

        }
        if(context === "Seen Last Month")  {
            this.populateHTML(this.seenLastMonth());
            document.getElementById("seenFilter").setAttribute("class", "nav-link active filter");
            document.getElementById("seenFilter").setAttribute("style", "background-color: #2F3B50;");
            document.getElementById("seenFilterC").setAttribute("class", "nav-link active filter");
            document.getElementById("seenFilterC").setAttribute("style", "background-color: #2F3B50;");

        }
        if(context === "Unseen") {
            this.populateHTML(this.unseen());
            document.getElementById("unseenFilter").setAttribute("class", "nav-link active filter");
            document.getElementById("unseenFilter").setAttribute("style", "background-color: #2F3B50;");
            document.getElementById("unseenFilterC").setAttribute("class", "nav-link active filter");
            document.getElementById("unseenFilterC").setAttribute("style", "background-color: #2F3B50;");

        }

        //RATING LISTENER
        let films = document.querySelectorAll(".film");
        films.forEach((film) => {
            let stars = film.querySelectorAll(".bi-star");

            stars.forEach((star, index) => {
                star.addEventListener("click", (event) => {
                    let clickedStar = event.target;
                    film.rating = index + 1;
                    this.setRating(film.getElementsByTagName("th")[0].textContent, film.rating);
                    updateRating(film, film.rating);
                });
            });
        });

        //FAVORITE LISTENER
        films = document.querySelectorAll(".film");
        films.forEach( film => {
            let favorite = film.querySelector(".favCheckbox");
            favorite.addEventListener("click", (event) => {
                if(event.target == null) {
                    favorite.checked = false;
                    return;
                }
                event.target.checked = (event.target.checked) ? true : false;
                film.favorites = event.target.checked;
                this.setFavorite(film.getElementsByTagName("th")[0].textContent, event.target.checked);
            });
        });

        //TRASH LISTENER
        films = document.querySelectorAll(".film");
        films.forEach( film => {
            let trash = film.querySelector(".trash");
            trash.addEventListener("click", (event) => {
                this.deleteFilm(film.getElementsByTagName("th")[0].textContent);
                this.switchContext("All");
            });
        });

    }
}

function updateRating(film, rating) {
    let currentRating = film.querySelector(".rating").dataset.rating || 0;
    film.querySelector(".rating").dataset.rating = rating;

    // Update the stars to reflect the new rating
    let stars = film.querySelectorAll(".bi-star");
    stars.forEach((star, index) => {
        if (index < rating) {
            star.setAttribute("fill", "#FDCC0D");
            star.setAttribute("opacity", "100%");
        } else {
            star.setAttribute("fill", "currentColor");
            star.setAttribute("opacity", "35%");
        }
    });
}

function main() {
    //FILM LIBRARY INIT
    let filmLibrary = new FilmLibrary();

    filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5));
    filmLibrary.addNewFilm(new Film(2, "21 Grams", true, dayjs("2023-01-17"), 4));
    filmLibrary.addNewFilm(new Film(3, "Star Wars", false));
    filmLibrary.addNewFilm(new Film(4, "Matrix", false));
    filmLibrary.addNewFilm(new Film(5, "Shrek", false, dayjs("2023-03-21"), 3));

    //VIEW INIT
    filmLibrary.switchContext( "All");

    //FILTER LISTENER
    const tabs = document.querySelectorAll(".nav-link");
    tabs.forEach( function(item ) {
        item.addEventListener('click', function() {
            document.getElementById("main_title").textContent = item.textContent;
            filmLibrary.switchContext(item.textContent.trim());
        });
    });
}

main();


