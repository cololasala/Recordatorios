const mongoose = require("mongoose");

const recordatorioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
  },
  start: {
    type: String,
    required: false,
  },
  end: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Recordatorio", recordatorioSchema);
