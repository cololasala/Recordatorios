const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const users = require("./routes/users_routes");
const reminders = require("./routes/reminder_routes");
const nodemailer = require("nodemailer");
const Recordatorio = require("./models/recordatorio_model");
const e = require("cors");

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
    this.app.use("/api/reminders", reminders);
  }

  start() {
    this.app.listen(this.app.get("port"));
    console.log("Conexion en puerto: " + this.app.get("port"));
    /* sendEmails(); */
  }
}

const convertFormatDate = (date) => {
  const dateAsArray = date.split("-");
  return `${dateAsArray[2]}/${dateAsArray[1]}/${dateAsArray[0]}`;
};

const sendEmails = () => {
  async function main() {
    const todayPlusFive = new Date();
    todayPlusFive.setDate(todayPlusFive.getDate() + 5);
    const formatIso = todayPlusFive.toISOString().split('T')[0];
    let emails = await Recordatorio.find({active: true, date: formatIso}).select({user: 1, title: 1, date: 1, _id: 0});

    emails = emails.map((e) => {
      return {
        user: e.user,
        title: e.title,
        date: convertFormatDate(e.date)
      }
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'luciano.lasala123@gmail.com',
        pass: 'ocnarvdmsxhepbim',
      },
    });

    emails.forEach(async(e) => {
      const info = await transporter.sendMail({
        from: '"Recordatorio APP 📅" <recordatorios-app@example.com>',
        to: `${e.user}`, 
        subject: "Aviso de recordatorio ✔",
        html: `<p><b>Recordatorio:</b> ${e.title}</p>
                <p><b>Fecha: </b>${e.date}</p>`,
      });
      console.log("Message sent: %s", info.messageId);
    });
  }

  main().catch(console.error);
};

const server = new Server();
server.start();
