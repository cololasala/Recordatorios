const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario_model");

router.get("/", (req, res) => {
  const result = getUsers();
  result
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

router.post("/", (req, res) => {
  const result = createtUser(req.body);
  result
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

router.post("/user", (req, res) => {
  const result = getUser(req.body);
  result
    .then((users) => {
      if(users.length !== 0) {
        res.status(200).json(users);
      } else {
        res.status(401).json({
          error: 'Usuario o contraseña incorrecto'
        })
      }
      
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

const getUsers = async () => {
  return await Usuario.find();
};

const getUser = async (body) => {
  return await Usuario.find({email: body.email, password: body.password}).select({firstName: 1, lastName: 1, email: 1, password: 1, _id: 0});
};

const createtUser = async (body) => {
  const user = new Usuario({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });
  return await user.save();
};

module.exports = router;
