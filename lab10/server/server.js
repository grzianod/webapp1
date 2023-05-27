"use strict";

const FilmLibrary = require('./filmLibrary');

const express = require('express');
const app = express();
const {check, validationResult} = require('express-validator');
const morgan = require('morgan')
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors( { origin: "*", credentials: true } ));

const server = "http://localhost"
const port = 3002
app.get('/api/films/filters/:filter', async (req, res) => {
    switch (req.params.filter) {
        case "all": FilmLibrary.getAll()
            .then(films => setTimeout(() => res.json(films), 1000))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "favorites": FilmLibrary.getFavorites()
            .then(films => setTimeout(() => res.json(films), 1000))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "bestrated": FilmLibrary.getBestRated()
            .then(films => setTimeout(() => res.json(films), 1000))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "seenlastmonth": FilmLibrary.getSeenLastMonth()
            .then(films => setTimeout(() => res.json(films), 1000))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        case "unseen": FilmLibrary.getUnseen()
            .then(films => setTimeout(() => res.json(films), 1000))
            .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
        break;
        default: return res.status(404).json({error: "Filter Not Valid"} ).end();
    }
    }
);

app.post('/api/films/add', [
        check('title').isLength({min: 1}),
        check('favorite').isBoolean(),
        check('rating').isNumeric({ min: 0, max: 5 }),
        check('user').isLength({min: 1})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({error: errors.array()[0].msg.autoCapitalize}).end();
        }
        try {
            FilmLibrary.addFilm(req.body.title, req.body.favorite, req.body.watchdate, req.body.rating, req.body.user)
                .then((id) => {
                    setTimeout(() => res.status(201).json({ id: id, title: req.body.title, favorite: req.body.favorite, watchdate: req.body.watchdate, rating: req.body.rating, user: req.body.user }), 1000);
                })
                .catch(() => res.status(505).end());
        } catch (err) {
            res.status(503).json({ error: `Database error during the creation of Film` });
        }

    });


app.delete('/api/films/:id', (req, res) => {
    FilmLibrary.deleteFilm(req.params.id)
        .then(() => setTimeout(() => res.status(200).end(), 1000))
        .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
});

app.put('/api/films/update/:id', [
        check('title').isLength({ min: 1}),
        check('favorite').isBoolean(),
        check('rating').isNumeric({ min: 0, max: 5 }),
        check('user').isLength({min: 1})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        try {
            FilmLibrary.modifyFilm(req.params.id, req.body.title, req.body.favorite, req.body.watchdate, req.body.rating, req.body.user)
                .then((id) => {
                    setTimeout( () => res.status(201).json({ id: id, title: req.body.title, favorite: req.body.favorite, watchdate: req.body.watchdate, rating: req.body.rating, user: req.body.user }) ,1000);
                })
                .catch(() => res.status(505).end());
        } catch (err) {
            res.status(503).json({ error: `Database error during the creation of answer ${answer.text} by ${answer.respondent}.` });
        }

    });
app.listen(port, () => console.log("Netflux Server listening on " + server + ":" + port + "..."));