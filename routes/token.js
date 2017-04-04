'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt');
const humps = require('humps');
const router = express.Router();

// YOUR CODE HERE



router.get('/', function(req, res, next) {
    if (req.cookies.token) {
    res.status(200)
    res.send(true)
  }else {
    res.status(200)
    res.send(false)
  }
})


router.post('/', function(req, res, next) {
    knex('users')
        .where('email', req.body.email)
        .then((users) => {
            var match = bcrypt.compareSync(req.body.password, users[0].hashed_password)
            if (match === true) {
                delete users[0].hashed_password;
                let token = jwt.sign(users[0], process.env.JWT_KEY);  //sign = encode what i tell you to
                res.cookie('token', token, {httpOnly:true});
                res.status(200);
                res.send(humps.camelizeKeys(users[0]));
              }

        })
})

router.delete('/', function(req, res, next) {
  res.clearCookie('token')
  res.status(200);
  res.send(true);
})


module.exports = router;
