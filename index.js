require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

const PORT = process.env.PORT || 80;

const db = mysql.createPool({
  host: process.env.HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.DATABASE
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/user', (req, res) => {
  if (!req.query.userId || !req.query.reviewId) {
    throw new Error('oops')
  }
  db.query(`SELECT * FROM User NATURAL JOIN Review WHERE UserId = ${req.query.userId}`, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.send(results)
  })
})

app.post('/addUser', (req, res) => {
  db.query(`INSERT INTO User(UserId, FirstName, LastName) VALUES (003, "${req.body.FirstName}", "${req.body.LastName}")`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new user!')
  })
})

app.post('/updateUser', (req, res) => {
  if (!req.query.userId || !req.query.reviewId) {
    throw new Error('oops')
  }
  db.query(`UPDATE User SET "${req.body.FirstName}", "${req.body.LastName}")`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new user!')
  })
})


app.post('/deleteUser', (req, res) => {
  db.query(`DELETE From User WHERE UserId = ${req.body.UserId}`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Deleted user!')
  })
})

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})
