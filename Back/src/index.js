const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const users = require('./routes/users_routes');
const reminders = require('./routes/reminder_routes');

mongoose
  .connect(config.get("configDB.HOST"))
  .then(() => {
    console.log("Conexion mongodb");
  })
  .catch((error) => {
    console.log("Error en conexion", error);
  });

class Server {
  app;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", process.env.PORT || 4200);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use("/api/users", users);
    this.app.use("/api/reminders", reminders)
  }

  start() {
    this.app.listen(this.app.get("port"));
    console.log("Conexion en puerto: " + this.app.get("port"));
  }
}

const server = new Server();
server.start();