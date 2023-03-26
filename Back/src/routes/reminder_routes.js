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

router.put("/deactivate", (req, res) => {
  const result = deactivateReminders(req.body);

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

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const result = dropReminder(id);

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
    _id: 1,
    title: 1,
    date: 1,
    start: 1,
    end: 1,
    color: 1,
    active: 1,
  });
};

const createReminder = (body) => {
  const newReminder = new Recordatorio({
    user: body.user,
    title: body.title,
    date: body.date,
    start: body.start,
    end: body.end,
    color: body.color,
    active: body.active,
  });

  return newReminder.save();
};

const dropReminder = async (id) => {
  return await Recordatorio.findByIdAndRemove(id);
};

const deactivateReminders = async(body) => {
  return await body.forEach(async (b) => {
    return await Recordatorio.findByIdAndUpdate(b, { active: false });
  });
};

module.exports = router;
