"use strict";
const dayjs = require('dayjs');

function Film(id, title, favorites = false, date, rating ) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date ?? null;
    this.rating = rating ?? null;

    this.toString = () => `ID: ${this.id} Title: ${this.title} Favorite: ${this.favorites} Watch Date: ${this.date ? this.date.format("YYYY-MM-DD") : "NULL"} Rating: ${this.rating ? this.rating : "NULL"}`;
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

    this.deleteFilm = function(id) {
        this.films = this.films.filter( item => item.id != id );
    }

    this.resetWatchedFilms = function() {
        this.films.forEach(item => item.date = null );
    }

    this.getRated = function() {
        return this.films.filter(item => item.rating).sort((a,b) => b.rating-a.rating);
    }

    this.toString = () => this.films.reduce((acc, curr) => acc + curr + "\n", "");

}

let filmLibrary = new FilmLibrary();

filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5));
filmLibrary.addNewFilm(new Film(2, "21 Grams", true, dayjs("2023-03-17"), 4));
filmLibrary.addNewFilm(new Film(3, "Star Wars", false));
filmLibrary.addNewFilm(new Film(4, "Matrix", false));
filmLibrary.addNewFilm(new Film(5, "Shrek", false, dayjs("2023-03-21"), 3));

console.log("\n\t1) Film Library sorted by date: ");
filmLibrary.sortByDate().forEach(item => console.log(item.toString()));

console.log("\n\t2) Removing film with id=3: ");
filmLibrary.deleteFilm(3);
console.log(filmLibrary.toString());

console.log("\n\t3) Resetting already watched films: ");
filmLibrary.resetWatchedFilms();
console.log(filmLibrary.toString());

console.log("\n\t4) Film Library sorted by rating: ");
filmLibrary.getRated().forEach(item => console.log(item.toString()));

