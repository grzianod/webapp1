"use strict";

const sqlite = require('sqlite3');
const db = new sqlite.Database("bookings.db", (err) => {
    if (err) throw err;
});

exports.validateFlight = async function (type) {
    let result = await new Promise((resolve, reject) => {
        db.get(`SELECT flightID, COUNT(*) as count FROM flights WHERE type='${type}'`, [], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });

    if (result.count > 0) return result;
    return { error: "Flight Not Found" };
};

exports.validateReservation = async function (flightID, userID) {
    let result = await new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(*) as count FROM reservations WHERE userID=? AND flightID=?`, [userID, flightID], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });

    if (result.count > 0) return result;
    return { error: "Reservation Not Found" };
};

exports.getFlights = async function () {
    return new Promise((resolve, reject) => {
        db.all('SELECT type,lines, seats FROM flights', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getSeats = function (flightID) {
    return new Promise((resolve, reject) => {
        db.all('SELECT seat FROM reservations WHERE flightID=?;', [flightID], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

exports.getReservedSeats = async function (flightID, userID) {
    let result = {reserved: [], booked: []};

    const reservedPromise = new Promise((resolve, reject) => {
        db.all(
            'SELECT seat FROM reservations WHERE flightID=? AND userID=?;',
            [flightID, userID],
            (err, rows) => {
                if (err) reject(err);
                else {
                    result.reserved = rows;
                    resolve();
                }
            }
        );
    });

    const bookedPromise = new Promise((resolve, reject) => {
        db.all(
            'SELECT seat FROM reservations WHERE flightID=? AND userID!=?;',
            [flightID, userID],
            (err, rows) => {
                if (err) reject(err);
                else {
                    result.booked = rows;
                    resolve();
                }
            }
        );
    });

    await Promise.all([reservedPromise, bookedPromise]);

    return result;
};


exports.deleteBooking = async function (flightID, userID) {
    return new Promise((resolve, reject) => {
        db.all('DELETE FROM reservations WHERE flightID=? AND userID=?;', [flightID, userID], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

exports.addReservation = async function (flightID, userID, reservedSeats) {
    return new Promise(async (resolve, reject) => {

        db.run("BEGIN TRANSACTION");

        //check if the reserved seats number fits on the selected plane number of reservable seats
        let plane = await new Promise( (resolve, reject) => {
            db.get('SELECT lines, seats FROM flights WHERE flightID=?', [flightID], function (err, row) {
                if (err) {
                    db.run("ROLLBACK");
                    reject(err);
                }
                else resolve(row);
            });
        });

        if (reservedSeats.length > plane.lines * plane.seats) {
            db.run("ROLLBACK");
            reject({ error: "Invalid number of seats" });
        }

        //check if the user has already performed a reservation
        let reservation = await new Promise( (resolve, reject) => {
           db.all('SELECT COUNT(*) as count FROM reservations WHERE flightID=? AND userID=?', [flightID, userID], function(err, row) {
               if(err) {
                   db.run("ROLLBACK");
                   reject(err);
               }
               else resolve(row);
           })
        });

        if(reservation.count > 0) {
            db.run("ROLLBACK");
            reject({ error: "Impossible to book multiple times for the same flight"});
        }

        const bookedSeats = [];
        const seats = reservedSeats.map( (item) => ({seat: item.seat.toUpperCase()}));

        //check if any of the reserved seats are already booked by other users
        for (const seat of seats) {
            const result = await new Promise((resolve, reject) => {
                db.get('SELECT COUNT(*) AS count FROM reservations WHERE seat = ? AND flightID = ? AND userID != ?', [seat.seat, flightID, userID], (err, row) => {
                    if (err) {
                        db.run("ROLLBACK");
                        reject(err);
                    }
                    else resolve(row);
                });
            });

            if (result.count > 0) {
                bookedSeats.push(seat.seat);
            }
        }

        if (bookedSeats.length > 0) {
            db.run("ROLLBACK");
            reject({ conflicts: bookedSeats });
        } else {

            //insert the new reservation
            for (const seat of seats) {

                await new Promise((resolve, reject) => {
                    db.run('INSERT INTO reservations (userID, flightID, seat) VALUES (?, ?, ?);', [userID, flightID, seat.seat], function (err) {
                        if (err) {
                            db.run("ROLLBACK");
                            reject(err);
                        }
                        else resolve();
                    });
                });

            }

            const result = this.getReservedSeats(flightID, userID);
            db.run("COMMIT");
            resolve(result);
        }
    });
};




