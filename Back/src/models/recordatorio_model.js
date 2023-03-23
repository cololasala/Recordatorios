const mongoose = require("mongoose");

const recordatorioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Recordatorio", recordatorioSchema);
