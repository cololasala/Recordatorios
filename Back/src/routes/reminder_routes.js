const express = require("express");
const Recordatorio = require("../models/recordatorio_model");
const router = express.Router();

router.get("/", (req, res) => {
  const result = getReminders();

  result
    .then((reminders) => {
      res.status(200).json(reminders);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

router.post("/", (req, res) => {
  const result = createReminder(req.body);

  result
    .then((reminder) => {
      res.status(200).json(reminder);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

const getReminders = async () => {
  return await Recordatorio.find().select({
    title: 1,
    date: 1,
    start: 1,
    end: 1,
    _id: 0,
  });
};

const createReminder = (body) => {
  console.log(body);
  const newReminder = new Recordatorio({
    title: body.title,
    date: body.date,
    start: body.start,
    end: body.end,
  });

  return newReminder.save();
};

module.exports = router;
