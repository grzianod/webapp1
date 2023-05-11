"use strict";

const dayjs = require('dayjs');
const sqlite = require('sqlite3');
const db = new sqlite.Database("films.db", (err) => {
    if (err) throw err;
});

function Film(id, title, favorite = false, date, rating) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date ?? null;
    this.rating = rating ?? null;

    this.toString = () => `ID: ${this.id} Title: ${this.title} Favorite: ${this.favorite} Watch Date: ${this.date ? this.date.format("YYYY-MM-DD") : "NULL"} Rating: ${this.rating ? this.rating : "NULL"}`;
}

exports.getAll = async function () {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films;", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate).isValid() ? dayjs(item.watchdate) : null, item.rating)));
        });
    });
}

exports.getFavorites = async function () {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films WHERE favorite = ?;", [1], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate).isValid() ? dayjs(item.watchdate) : null, item.rating)));
        });
    });
}

exports.getBestRated = async function () {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films WHERE rating=5;", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate).isValid() ? dayjs(item.watchdate) : null, item.rating)));
        });
    })
}

exports.getSeenLastMonth = async function () {
    let now = dayjs().format("YYYY-MM-DD");

    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films;", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.filter(item => dayjs(item.watchdate).isValid() && dayjs(now).diff(dayjs(item.watchdate), 'd') < 30 ? item : null).map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate).isValid() ? dayjs(item.watchdate) : null, item.rating)));
        });
    });
}

exports.getUnseen = async function () {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films WHERE (watchdate IS NULL OR watchdate = '');", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate).isValid() ? dayjs(item.watchdate) : null, item.rating)));
        });
    });
}

exports.getFilm = async function (id) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM films WHERE id = ?;", [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate).isValid() ? dayjs(item.watchdate) : null, item.rating)));
        });
    });
}

exports.addFilm = async function (title, favorite, watchdate, rating, user) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO films(title, favorite, watchdate, rating, user) VALUES(?, ?, DATE(?), ?, ?)",
            [title, favorite, watchdate, rating, user],
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            }
        );
    });
}

exports.modifyFilm = async function(id, title, favorite, watchdate, rating, user) {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE films SET title = ?, favorite = ?, watchdate = DATE(?), rating = ?, user = ? WHERE id = ?;",
            [title, favorite, watchdate, rating, user, id],
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(parseInt(id));
            }
        );
    });
}


exports.updateRating = async function(id, rating) {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE films SET rating = ? WHERE id = ?;",
            [rating, id],
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(parseInt(id));
            }
        );
    });
}

exports.updateFavorite = async function(id, favorite) {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE films SET favorite = ? WHERE id = ?;",
            [favorite, id],
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(parseInt(id));
            }
        );
    });
}

exports.deleteFilm = async function(id) {
    return new Promise((resolve, reject) => {
        db.all("DELETE FROM films WHERE id = ?;", [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(item => new Film(item.id, item.title, item.favorite, dayjs(item.watchdate).isValid() ? dayjs(item.watchdate) : null, item.rating)));
        });
    });
}

exports.toString = () => this.films.reduce((acc, curr) => acc + curr.toString() + "\n", "");



