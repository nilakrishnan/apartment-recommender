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

// TODO
app.post('/updateUser', (req, res) => {

  if (!req.body.userId) {
    throw new Error('we need the userId!')
  }

  for (const [key, value] of Object.entries(req.body)) {
    // console.log(`${key}: ${value}`);
    if (`${key}` === "firstName") {
      db.query(`UPDATE User SET FirstName = "${req.body.firstName}" WHERE UserId = "${req.body.userId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "lastName") {
      db.query(`UPDATE User SET LastName = "${req.body.lastName}" WHERE UserId = "${req.body.userId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    }
  }

  res.send("user updated!")
})

app.post('/deleteUser', (req, res) => {
  db.query(`DELETE From Review WHERE UserId = "${req.body.userId}"`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Deleted user reviews!')
  })

  db.query(`DELETE From User WHERE UserId = "${req.body.userId}"`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Deleted user!')
  })
  // have to delete the reviews all the reviews first!
  // TODO: if we delete a user does that delete all their reviews??
  // '03717f3a-b224-4e65-9322-234b245467f7', 'John', 'Smith'


})

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

// TODO
app.post('/updateReview', (req, res) => {


})

app.post('/deleteReview', (req, res) => {
  db.query(`DELETE From Review WHERE ReviewId = ${req.body.reviewId}`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Deleted review!')
  })
})


app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})
