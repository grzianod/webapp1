"use strict";

const flightBooking = require('./dao');

const express = require('express');
const app = express();
const {check, validationResult} = require('express-validator');
const morgan = require('morgan')
const cors = require('cors');

const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao.js'); // module for accessing the user info in the DB

passport.use(new LocalStrategy(
    function(username, password, done) {
      userDao.getUser(username, password).then((user) => {
        if (!user)
          return done(null, false, { message: 'Incorrect username and/or password.' });

        return done(null, user);
      })
    }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
      .then(user => {
        done(null, user); // this will be available in req.user
      }).catch(err => {
    done(err, null);
  });
});

app.use(morgan('dev'));
app.use(express.json());
app.use(cors( { origin: "http://localhost:5173", credentials: true}  ));
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'adminpassport',   //personalize this random string, should be a secret value
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const server = "http://localhost"
const port = 3002

const isLogged = (req, res, next) => {
  if(req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not Authenticated'});
}

app.get('/api/booking/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user).end();
    } else
        res.status(401).json({error: 'Not Authenticated'}).end();
});

app.post('/api/booking/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json({error: 'Not Authenticated'}).end();
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});

app.delete('/api/booking/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

app.get('/api/seats', async (req, res) => {
        flightBooking.getFlights()
                .then(response => {
                    if(response.length === 0)
                        res.status(204).end();
                    else
                        res.json(response)
                })
                .catch(() => res.status(500).json({ error: "Internal Server Error"} ).end());
    }
);

app.get('/api/booking/seats/:type/booked', async (req, res) => {
    try {
        const result = await flightBooking.validateFlight(req.params.type);
        if (result.error)
            return res.status(404).json(result).end();

        const flightID = result.flightID;
        const seats = await flightBooking.getSeats(flightID);
        return res.json({ booked: seats }).end();
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" }).end();
    }
});


app.get('/api/booking/seats/:type/reserved', isLogged, async (req, res) => {
    try {
        let result = await flightBooking.validateFlight(req.params.type);
        if (result.error)
            return res.status(404).json(result).end();

        const flightID = result.flightID;
        result = await flightBooking.getReservedSeats(flightID, req.user.id);
        const response = { reserved: result.reserved, booked: result.booked };
        res.json(response).end();
    }
    catch {
        res.status(500).json({error: "Internal Server Error"}).end();
    }
});

app.delete('/api/booking/seats/:type/reserved', isLogged, async (req, res) => {
    try {
        let result = await flightBooking.validateFlight(req.params.type);
        if (result.error)
            return res.status(404).json(result).end();

        const flightID = result.flightID;

        result = await flightBooking.validateReservation(flightID,req.user.id);
        if(result.error)
            return res.status(404).json(result).end();

        result = await flightBooking.deleteBooking(flightID, req.user.id);
        res.status(200).end();

    }
    catch {
        res.status(500).json({error: "Internal Server Error"}).end();
    }
});

app.post('/api/booking/seats/:type', isLogged, [
        check('seats').exists().withMessage("Unprocessable entity"),
        check('seats').isArray({min: 1}).withMessage("Invalid request format"),
        check('seats.*.seat').exists().withMessage("Invalid seat format"),
        check('seats.*.seat').custom( (seat) => {
            if(seat.length < 2)
                throw new Error("Invalid seat code");

            let foundNumber = false;
            let foundLetters = false;
            let lettersCount = 0;

            for (let i = 0; i < seat.length; i++) {
                if (!isNaN(parseInt(seat[i]))) {
                    foundNumber = true;
                    lettersCount = 0;
                } else if (isNaN(parseInt(seat[i])) && foundNumber) {
                    foundLetters = true;
                    lettersCount++;
                }
            }
            if(!(foundNumber && foundLetters && lettersCount > 0))
                throw new Error("Invalid seat code");
            return true;
        })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array().pop().msg }).end();
        }

    try {
        let result = await flightBooking.validateFlight(req.params.type);
        if (result.error)
            return res.status(404).json(result).end();

        const flightID = result.flightID;
        result = await flightBooking.addReservation(flightID, req.user.id, req.body.seats);
        const response = {reserved: result.reserved, booked: result.booked};
        res.json(response).end();

    } catch (error) {
        if (error.conflicts)
            res.status(409).json({conflicts: error.conflicts.map((unavailable) => ({seat: unavailable}))}).end();
        else if (error.error)
            res.status(422).json(error).end();
        else
            res.status(500).json({error: "Internal Server Error"}).end();
    }

});

app.listen(port, () => console.log("FlyAir Server listening on " + server + ":" + port + "..."));