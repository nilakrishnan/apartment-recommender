require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');
const date = require('date-and-time');
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
  new_user_uuid = uuidv4();
  db.query(`INSERT INTO User(UserId, FirstName, LastName) VALUES ("${new_user_uuid}", "${req.body.firstName}", "${req.body.lastName}")`, function (error, results, fields) {
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
  db.query(`UPDATE User SET "${req.body.firstName}", "${req.body.lastName}")`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new user!')
  })
})


app.post('/deleteUser', (req, res) => {
  db.query(`DELETE From User WHERE UserId = ${req.body.userId}`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Deleted user!')
  })
})

// '35e232ef-4981-4b10-ad0e-e15711d8a6d3', 'Anchita', 'Birla'

app.post('/addReview', (req, res) => {
  new_uuid_review = uuidv4();
  const now = new Date();
  format_date = date.format(now, 'YYYY-MM-DD');

  db.query(`INSERT INTO Review(ReviewId, Date, ResponsivenessRating,
            SecurityDepositReturnedRating, WeekdayVolumeRating, WeekendVolumeRating,
            GreenStProximityRating, TransportationProximity, OverallRating, Description, UserId)
            VALUES ("${new_uuid_review}", "${format_date}", "${req.body.responsivenessRating}",
            "${req.body.securityDepositReturnedRating}", "${req.body.weekdayVolumeRating}",
            "${req.body.weekendVolumeRating}", "${req.body.greenStProximityRating}",
            "${req.body.transportationProximity}", "${req.body.overallRating}",
            "${req.body.description}", "${req.body.userId}")`,
            function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new review!')
  })
})

app.post('/updateReview', (req, res) => {
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


app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})
