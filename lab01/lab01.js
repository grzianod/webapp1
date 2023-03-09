"use strict";
const dayjs = require('dayjs');

function Film(id, title, favorites = false, date, rating ) {
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date ?? null;
    this.rating = rating ?? null;

    this.toString = () => `ID: ${this.id} Title: ${this.title} Favorite: ${this.favorites} Watch Date: ${this.date ? this.date.format("YYYY-MM-DD") : "No Date"} Rating: ${this.rating ? this.rating : "No Rating"}`;
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

    this.toString = () => this.films.forEach(item => console.log(item.toString()));

}

let filmLibrary = new FilmLibrary();
let film1 = new Film(1, "Pulp Fiction", true, dayjs("2023-03-10"), 5);
let film2 = new Film(2, "21 Grams", true, dayjs("2023-03-17"), 4);
let film3 = new Film(3, "Star Wars", false);
let film4 = new Film(4, "Matrix", false);
let film5 = new Film(5, "Shrek", false, dayjs("2023-03-21"), 3);

filmLibrary.addNewFilm(film1);
filmLibrary.addNewFilm(film2);
filmLibrary.addNewFilm(film3);
filmLibrary.addNewFilm(film4);
filmLibrary.addNewFilm(film5);

//filmLibrary.toString();

let sortedFilmLibrary = filmLibrary.sortByDate();
//sortedFilmLibrary.forEach(item => console.log(item));

filmLibrary.deleteFilm(3);
filmLibrary.toString();
