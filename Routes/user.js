const express = require('express');
const route = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../Models/user.model');

route.post('/signin', (req, res) => {
    UserModel.find({ username: req.body.username, password: req.body.password })
        .then((user) => {
            const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);
            res.status(200).send({ token });
        }).catch(err => res.status(401).send({ message: err.message }));
})

module.exports = route;
