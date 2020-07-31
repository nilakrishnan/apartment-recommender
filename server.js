require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path');
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

app.get('/', (req, res) => {
  res.status(200).send('hi')
})

app.get('/getUser', (req, res) => {
  db.query(`SELECT * FROM User WHERE UserId = '${req.query.UserId}'`, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.status(200).json(results)
  })
})

app.post('/addUser', (req, res) => {
  db.query(`INSERT INTO User(UserId, FirstName, LastName) VALUES ("${req.body.UserId}", "${req.body.FirstName}", "${req.body.LastName}")`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new user!')
  })
})

app.post('/updateUser', (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    if (`${key}` === "firstName") {
      db.query(`UPDATE User SET FirstName = "${req.body.FirstName}" WHERE UserId = "${req.body.UserId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "lastName") {
      db.query(`UPDATE User SET LastName = "${req.body.LastName}" WHERE UserId = "${req.body.UserId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    }
  }
  res.send("User updated!")
})

app.post('/deleteUser', (req, res) => {
  db.query(`DELETE From Review WHERE UserId = "${req.body.UserId}"`, function (error, results, fields) {
    if (error) {
      throw error
    }
    db.query(`DELETE From User WHERE UserId = "${req.body.UserId}"`, function (error, results, fields) {
      if (error) {
        throw error
      }
      res.send('Deleted user!')
    })
  })
})

app.get('/getUserReview', (req, res) => {
  db.query(`SELECT * FROM Review NATURAL JOIN User WHERE UserId = '${req.query.UserId}'`, function (error, results, fields) {
    if (error) {
      throw error;
    }
    res.json(results)
  })
})

app.post('/search', (req, res) => {
 db.query(`Select BuildingName From AptBuilding
 NATURAL JOIN Apartment NATURAL JOIN Amenities NATURAL JOIN Review
 WHERE Apartment.Price<= "${req.body.Price}" AND Amenities.Gym="${req.body.Gym}" AND Review.TransportationProximity >= "${req.body.TransportationProximity}"AND
 Review.GreenStProximityRating >= "${req.body.GreenStProximityRating}" AND NumBeds>= "${req.body.NumBeds}" AND
 NumBaths= "${req.body.NumBaths}" AND Amenities.Parking= "${req.body.Parking}" AND
 Amenities.Elevator>= "${req.body.Elevator}" AND Amenities.WasherDryer= "${req.body.WasherDryer}"
 AND Amenities.Internet= "${req.body.Internet}" AND Review.OverallRating>= "${req.body.OverallRating}"
 AND Review.WeekdayVolumeRating>= "${req.body.WeekdayVolumneRating}" AND Review.WeekendVolumeRating>= "${req.body.WeekendVolumeRating}"
 AND Review.SecurityDepositReturnedRating>= "${req.body.SecurityDepositReturnedRating}"
 AND Review.ResponsivenessRating>= "${req.body.ResponsivenessRating}"`, function (error, results, fields) {
   if (error) {
     throw error;
   }
   res.send(results)
 })
});


app.post('/addReview', (req, res) => {
  new_uuid_review = uuidv4();
  const now = new Date();
  format_date = date.format(now, 'YYYY-MM-DD');

  db.query(`INSERT INTO Review(ReviewId, UserId, AptId, Date, ResponsivenessRating,
            SecurityDepositReturnedRating, WeekdayVolumeRating, WeekendVolumeRating,
            GreenStProximityRating, TransportationProximity, OverallRating, Description)
            VALUES ("${new_uuid_review}", "${req.body.UserId}", "${req.body.AptId}", "${format_date}",
            "${req.body.ResponsivenessRating}", "${req.body.SecurityDepositReturnedRating}",
            "${req.body.WeekdayVolumeRating}", "${req.body.WeekendVolumeRating}",
            "${req.body.GreenStProximityRating}", "${req.body.TransportationProximity}",
            "${req.body.OverallRating}", "${req.body.dDscription}")`,
            function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Added new review!')
  })
})

app.post('/updateReview', (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    if (`${key}` === "responsivenessRating") {
      db.query(`UPDATE Review SET ResponsivenessRating = "${req.body.ResponsivenessRating}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "securityDepositReturnedRating") {
      db.query(`UPDATE Review SET SecurityDepositReturnedRating = "${req.body.SecurityDepositReturnedRating}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "weekdayVolumeRating") {
      db.query(`UPDATE Review SET WeekdayVolumeRating = "${req.body.WeekdayVolumeRating}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "weekendVolumeRating") {
      db.query(`UPDATE Review SET WeekendVolumeRating = "${req.body.WeekendVolumeRating}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "greenStProximityRating") {
      db.query(`UPDATE Review SET GreenStProximityRating = "${req.body.GreenStProximityRating}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "transportationProximity") {
      db.query(`UPDATE Review SET TransportationProximity = "${req.body.TransportationProximity}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "overallRating") {
      db.query(`UPDATE Review SET OverallRating = "${req.body.OverallRating}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    } else if (`${key}` === "description") {
      db.query(`UPDATE Review SET Description = "${req.body.Description}" WHERE ReviewId = "${req.body.ReviewId}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
      })
    }
  }
  res.send("review updated!")
})

app.post('/deleteReview', (req, res) => {
  db.query(`DELETE From Review WHERE ReviewId = ${req.body.ReviewId}`, function (error, results, fields) {
    if (error) {
      throw error
    }
    res.send('Deleted review!')
  })
})


app.listen(PORT, () => {
    console.log('Server started on port', PORT);
})
