'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');

// open the database
const db = new sqlite.Database('bookings.db', (err) => {
    if(err) throw err;
});

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE userID = ?';
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({error: 'User not found.'});
            else {
                // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
                const user = {id: row.userID, username: row.email, name: row.name, surname: row.surname}
                resolve(user);
            }
        });
    });
};

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) { resolve(false); }
            else {
                const user = {id: row.userID, username: row.email, name: row.name, surname: row.surname};

                const salt = row.salt;
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);

                    const passwordHex = Buffer.from(row.hash, 'hex');

                    if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
                        resolve(false);
                    else resolve(user);
                });
            }
        });
    });
};

