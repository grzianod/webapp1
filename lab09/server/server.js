"use strict";

const FilmLibrary = require('./filmLibrary');

const express = require('express');
const cors = require('cors');
const app = express();
const {check, validationResult} = require('express-validator');
const morgan = require('morgan')

app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173"
}
app.use(cors(corsOptions));

const server = "http://localhost"
const port = 3002

app.get('/api/films', (req, res) => {
    FilmLibrary.getAll()
        .then(films => res.json(films))
        .catch(() => res.status(500).end());
});

app.get('/api/films/filters/:filter', async (req, res) => {
    switch (req.params.filter) {
        case "all": FilmLibrary.getAll()
            .then(films => res.json(films))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "favorites": FilmLibrary.getFavorites()
            .then(films => res.json(films))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "bestrated": FilmLibrary.getBestRated()
            .then(films => res.json(films))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "seenlastmonth": FilmLibrary.getSeenLastMonth()
            .then(films => res.json(films))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "unseen": FilmLibrary.getUnseen()
            .then(films => res.json(films))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        default: return res.status(404).json({error: "Filter Not Valid"} ).end();
    }
    }
);

app.listen(port, () => console.log("Netflux Server listening on " + server + ":" + port + "..."));