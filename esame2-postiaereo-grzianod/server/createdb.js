const sqlite = require('sqlite3');

function createDatabase() {
    const dbName = 'bookings';
    const db = new sqlite.Database(`${dbName}.db`);

    db.serialize(() => {

        /* Users Table */
        db.run(`CREATE TABLE IF NOT EXISTS users (
		userID INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT,
		name TEXT,
		surname TEXT,
		salt TEXT,
		hash TEXT        
	  )`);

        /* Flights Table */
        db.run(`CREATE TABLE IF NOT EXISTS flights (
      flightID INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT UNIQUE,
      lines INTEGER,
      seats INTEGER
    )`);

        /* Reservations Table */
        db.run(`CREATE TABLE IF NOT EXISTS reservations (
        userID INTEGER,
        flightID INTEGER,
        seat TEXT,
        FOREIGN KEY (flightID) REFERENCES flights(flightID)
    )`);

        db.run(`INSERT INTO users (email, name, surname, salt, hash) VALUES
		('test1@polito.it', 'John', 'Smith',  '72e4eeb14def3b21', 'e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42'),
		('test2@polito.it', 'Emily', 'Collins', 'a8b618c717683608', 'ac28edf49ba34ac83c17145375a030b4579ffddf3fe1dbb68f530bb3ca4ce514'),
		('test3@polito.it', 'Henry', 'Nelson', 'wgb32sge2sh7hse7', 'ec86e478076f427fae157214e43cf87d809feec8c4d82edde475889dd50bf826'),
		('test4@polito.it', 'Alexander', 'Evans', 'e818f0647b4e1fe0', '4af3cc8549ccc19af11b711cada4509c4e93c57cca34078c683498ed7bf64258')
	  `);

        db.run(`INSERT INTO flights (type, lines, seats) VALUES
		('local', 15, 4),
        ('regional', 20, 5),
        ('international', 25, 6)
	  `);

        db.run(`INSERT INTO reservations (userID, flightID, seat) VALUES
		(1, 1,  '1A'),
        (1, 1,  '1B'),
        (1, 1,  '2A'),
        (1, 1,  '2B'),
        (1, 1,  '5C'),
        (1, 1,  '5D'),
        (1, 1,  '10A'),
        (1, 1,  '10B'),
        (1, 1,  '8C'),
        (1, 1,  '13B'),
        
        (1, 3,  '2B'),
        (1, 3,  '2C'),
        (1, 3,  '3B'),
        (1, 3,  '3C'),
        (1, 3,  '5F'),
        (1, 3,  '4F'),
        (1, 3,  '3F'),
        (1, 3,  '2F'),
        (1, 3,  '9B'),
        (1, 3,  '9C'),
        (1, 3,  '14E'),
        
        (3, 2,  '1C'),
        (3, 2,  '1B'),
        (3, 2,  '1D'),
        (3, 2,  '1E'),
        (3, 2,  '1A'),
        (3, 2,  '2E'),
        (3, 2,  '3E'),
        (3, 2,  '4E'),
        (3, 2,  '4D'),
        (3, 2,  '3D'),
        (3, 2,  '2D'),
        (3, 2,  '5D'),
        (3, 2,  '5E'),
        (3, 2,  '9B'),
        (3, 2,  '9C'),
        (3, 2,  '17C'),
        (3, 2,  '17D'),
        
        (3, 3,  '11A'),
        (3, 3,  '11B'),
        (3, 3,  '11C'),
        (3, 3,  '12A'),
        (3, 3,  '12B'),
        (3, 3,  '12C'),
        (3, 3,  '4A'),
        (3, 3,  '4B'),
        (3, 3,  '4C'),
        (3, 3,  '1A')
`);

        db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Database "${dbName}" created successfully.`);
            }
        });
    });
}

createDatabase();
