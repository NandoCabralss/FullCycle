var mysql = require('mysql');
const express = require('express')
const faker = require('@faker-js/faker');

// Create a new express application instance
const app = express()

var isConnected = false;

// Get variables from .env file
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;
const port = process.env.PORT || 3000;

// Create a connection to the database
var connection = mysql.createConnection({
    host: 'db',
    user,
    password,
    database,
});

// Insert random name and get all records from the database
app.get('/', async (req, res) => {
  connectToDatabase();
  insertRecord(faker.faker.name.firstName());
  getRecords(res);
})

// Insert a new record into the database
function insertRecord(name) {
    const record = { name };
    connection.query('INSERT INTO people SET ?', record);
    connection.commit();
}
 
// Get all records from the database
function getRecords(res) {
    connection.query('SELECT * FROM people', function (error, results) {
        if (error) throw error;
        const names = results.reduce((acc, record) => {
        return acc + `<p>${record.name}</p>`
        }, '<h1>Hello World!</h1>');

        res.send(names);
    });
}

function connectToDatabase() {
    if (!isConnected) {
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
        isConnected = true;
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}).on('error', (err) => {
    console.log(err)
})
