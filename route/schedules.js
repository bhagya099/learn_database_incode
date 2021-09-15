const express = require('express');
const router = express.Router();
const db = require('../databse');

router.get('/', (req, res) => {
  db.any(
    "SELECT user_id, day, TO_CHAR(start_time, 'HH12:MI AM') start_time, TO_CHAR(end_time, 'HH12:MI AM') end_time FROM schedules;"
  )
    .then((schedules) => {
      res.render('pages/schedules', {
        schedules,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get('/new', (req, res) => {
  res.render('pages/new-schedules');
});

router.post('/new', (req, res) => {
  const { user_id, day, start_time, end_time } = req.body;
  db.any(
    "SELECT user_id, day, TO_CHAR(start_time, 'HH24MISS') start_time, TO_CHAR(end_time, 'HH24MISS')  end_time FROM schedules WHERE user_id = $1 AND day =$2;",
    [user_id, day]
  )
    .then((schedules) => {
      console.log(schedules);
      const overlap = schedules.some((schedule) => {
        return start_time <= schedule.end_time && end_time >= schedule.end_time;
      });
      console.log(overlap);
      if (overlap) {
        res.send('Please selct other time');
      } else {
        res.send('Good time');
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });

  //  overlaping schedules
  // same day
  // same users
  //  start time at anytime in db.durations
  // start time is before db.start time and end time is db.end_time and also
});

module.exports = router;
