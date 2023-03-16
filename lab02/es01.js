"use strict";
const dayjs = require('dayjs');
const sqlite = require('sqlite3');
const db = new sqlite.Database("films.db", (err) => { if(err) throw err; });

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

    this.getAll = async function () {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM films;", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate), item.rating)));
            });
        });
    }

    this.getAllFavorites = async function() {
        return new Promise( (resolve, reject) => {
           db.all("SELECT * FROM films WHERE favorite = ?;", [1], (err, rows) => {
              if(err) reject(err);
              else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate), item.rating)));
           });
        });
    }

    this.getTodayWatched = async function() {
        let now = dayjs().format("YYYY-MM-DD");
        return new Promise ((resolve, reject) => {
            db.all("SELECT * FROM films WHERE watchdate = ?", [now], (err, rows) => {
                if(err) reject(err);
                else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate), item.rating)));
            });
        })
    }

    this.getWatchedEarlier = async function(date) {
        return new Promise( (resolve, reject) => {
            db.all("SELECT * FROM films WHERE watchdate < ?", [date], (err, rows) => {
               if(err) reject(err);
               else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate), item.rating)));
            });
        })
    }

    this.getGreaterThan = async function(rating) {
        return new Promise( (resolve, reject) => {
           db.all("SELECT * FROM films WHERE rating > ?", [rating], (err, rows) => {
             if(err) reject(err);
             else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate), item.rating)));
           });
        });
    }

    this.getByTitle = async function(title) {
        return new Promise( (resolve, reject) => {
           db.all("SELECT * FROM films WHERE title = ?", [title], (err, rows) => {
              if(err) reject(err);
              else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate), item.rating)));
           });
        });

    }

    this.addFilm = async function(film) {
        return new Promise( (resolve, reject) => {
           db.run( "INSERT INTO films(id, title, favorite, watchdate, rating) VALUES (?, ?, ?, ?, ?);", [film.id, film.title , film.favorite, film.watchdate, film.rating], function(err) {
               if(err) throw err;
               else resolve('Added successfully');
           })
        });
    }

    this.toString = () => this.films.reduce((acc, curr) => acc + curr.toString() + "\n", "");

}


async function main() {
    let filmLibrary = new FilmLibrary();

   try {
       console.log("\n\t1) Get all films from database: ");
       let all = await filmLibrary.getAll();
       all.forEach(item => console.log(item.toString()));
   }
   catch(err) {
       console.log(err);
   }

   try {
       console.log("\n\t2) Get all favorite films from database: ");
       let allFav = await filmLibrary.getAllFavorites();
       allFav.forEach(item => console.log(item.toString()));
   }
   catch(err) {
        console.log(err);
   }

    try {
        console.log("\n\t3) Get today-watched films from database: ");
        let allWatched = await filmLibrary.getTodayWatched();
        allWatched.forEach(item => console.log(item.toString()));
    }
    catch(err) {
        console.log(err);
    }

    try {
        let date = "2023-03-11";
        console.log("\n\t4) Get earlier-watched films from " + date + "from database: ");
        let allWatchedEarlier = await filmLibrary.getWatchedEarlier(date);
        allWatchedEarlier.forEach(item => console.log(item.toString()));
    }
    catch(err) {
        console.log(err);
    }

    try {
        let rating = 3;
        console.log("\n\t5) Get films with a rating greater than" + rating + "from database: ");
        let allGreaterThan = await filmLibrary.getGreaterThan(rating);
        allGreaterThan.forEach(item => console.log(item.toString()));
    }
    catch(err) {
        console.log(err);
    }

    try {
        let title = "Matrix";
        console.log("\n\t5) Get films with title" + title + "from database: ");
        let allTitle = await filmLibrary.getByTitle(title);
        allTitle.forEach(item => console.log(item.toString()));
    }
    catch(err) {
        console.log(err);
    }

    try {
        let film = new Film(6, "Guerra e Pace", false, null, null);
        console.log("\n\t6) Adding film " + film.title + "to database: ");
        let result = await filmLibrary.addFilm(film);
        console.log("\n" + result);
    }
    catch(err) {
        console.log(err);
    }

    db.close();
}

main();



