const mongoose = require("mongoose");

const recordatorioSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
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
  },
  active: {
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model("Recordatorio", recordatorioSchema);
