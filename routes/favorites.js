'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const boom = require('boom');
const bcrypt = require('bcrypt');
const humps = require('humps');
const router = express.Router();

// eslint-disable-next-line new-cap


// YOUR CODE HERE

router.get('/', (req, res, next) => {
    if (!req.cookies.token) {
        return next(boom.create(401, "Unauthorized"))
    } else {
        knex('favorites')
            .join('books', 'books.id', 'book_id')
            .then((favs) => {
                res.send(humps.camelizeKeys(favs));
                res.set("content-type", "application/json")
                res.status(200).send(true);
            });
    };
});


router.get('/check', (req, res, next) => {
    if (!req.cookies.token) {
        return next(boom.create(401, "Unauthorized"))
    } else {
        let id = +req.query.bookId;
        knex('favorites')
            .where('id', id)
            .then((favs) => {
                if (!favs.length) {
                    res.send(false)
                }
                res.send(true);
            });
    };
});


router.post('/', (req, res, next) => {
  if (!req.cookies.token) {
    return next(boom.create(401, 'Unauthorized'))
  }
  else {
    knex('favorites')
    .then((favs) => {
      knex('favorites')
        .insert({
          id: req.body.id,
          book_id: req.body.bookId,
          user_id: req.body.userId
        })
        .returning('*')
        .then((favs1) => {
          res.json(humps.camelizeKeys(favs1[0]));
          
        })
    })
  }
});


module.exports = router;
