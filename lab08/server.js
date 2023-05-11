"use strict";

const FilmLibrary = require('./filmLibrary');

const express = require('express');
const app = express();
const {check, validationResult} = require('express-validator');
const morgan = require('morgan')

app.use(morgan('dev'));
app.use(express.json());

const server = "http://localhost"
const port = 3002

app.get('/api/films', (req, res) => {
    FilmLibrary.getAll()
        .then(films => res.json(films))
        .catch(() => res.status(500).end());
});

app.get('/api/films/filters/:filter', (req, res) => {
    if (req.params.filter === "all") FilmLibrary.getAll()
                            .then(films => res.json(films))
                            .catch(() => res.status(500).end());
    if (req.params.filter === "favorites") FilmLibrary.getFavorites()
                                    .then(films => res.json(films))
                                    .catch(() => res.status(500).end());
    if (req.params.filter === "bestrated") FilmLibrary.getBestRated()
                                .then(films => res.json(films))
                                .catch(() => res.status(500).end());
    if (req.params.filter === "seenlastmonth") FilmLibrary.getSeenLastMonth()
                                                .then(films => res.json(films))
                                                .catch(() => res.status(500).end());
    if (req.params.filter === "unseen") FilmLibrary.getUnseen()
                                            .then(films => res.json(films))
                                            .catch(() => res.status(500).end());
    }
);

app.get('/api/films/:id', (req, res) => {
   FilmLibrary.getFilm(req.params.id).then(films => res.json(films)).catch(() => res.status(500).end());
});

app.post('/api/films/insert', [
    check('favorite').isBoolean(),
    check('rating').isNumeric({ min: 0, max: 5 }),
    check('watchdate').isDate({format: 'YYYY-MM-DD', strictMode: true}),
    check('user').isLength({min: 1})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        try {
            FilmLibrary.addFilm(req.body.title, req.body.favorite, req.body.watchdate, req.body.rating, req.body.user)
                .then((id) => {
                    res.status(201).json({ id: id, title: req.body.title, favorite: req.body.favorite, watchdate: req.body.watchdate, rating: req.body.rating, user: req.body.user });
                })
                .catch(() => res.status(505).end());
        } catch (err) {
            res.status(503).json({ error: `Database error during the creation of answer ${answer.text} by ${answer.respondent}.` });
        }

});

app.put('/api/films/update/:id', [
        check('favorite').isBoolean(),
        check('rating').isNumeric({ min: 0, max: 5 }),
        check('watchdate').isDate({format: 'YYYY-MM-DD', strictMode: true}),
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
                    res.status(201).json({ id: id, title: req.body.title, favorite: req.body.favorite, watchdate: req.body.watchdate, rating: req.body.rating, user: req.body.user });
                })
                .catch(() => res.status(505).end());
        } catch (err) {
            res.status(503).json({ error: `Database error during the creation of answer ${answer.text} by ${answer.respondent}.` });
        }

    });

app.put('/api/films/update/:id/rating', [
        check('rating').isNumeric({ min: 0, max: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        try {
            FilmLibrary.updateRating(req.params.id, req.body.rating)
                .then((id) => {
                    res.status(201).json({ id: id, rating: req.body.rating });
                })
                .catch(() => res.status(505).end());
        } catch (err) {
            res.status(503).json({ error: `Database error during the creation of answer ${answer.text} by ${answer.respondent}.` });
        }

    });

app.put('/api/films/update/:id/favorite', [
        check('favorite').isBoolean()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        try {
            FilmLibrary.updateFavorite(req.params.id, req.body.favorite)
                .then((id) => {
                    res.status(201).json({ id: id, favorite: req.body.favorite });
                })
                .catch(() => res.status(505).end());
        } catch (err) {
            res.status(503).json({ error: `Database error during the creation of answer ${answer.text} by ${answer.respondent}.` });
        }

    });

app.delete('/api/films/:id', (req, res) => {
    FilmLibrary.deleteFilm(req.params.id).then(() => res.status(204).end()).catch(() => res.status(500).end());
});

app.listen(port, () => console.log("Film Library Server listening on " + server + ":" + port + "..."));