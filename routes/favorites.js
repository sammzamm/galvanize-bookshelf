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
                // res.set("content-type", "application/json")
                // res.status(200).send(true);
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
                }else{

                  res.send(true);
                }
            });
    };
});


router.post('/', (req, res, next) => {
  if (!req.cookies.token) {
    return next(boom.create(401, 'Unauthorized'))
  }
  else {
    knex.raw("select setval('favorites_id_seq', (select max(id) from favorites))")
      .then(
        knex('favorites')
        .insert({
          id:2,
          book_id: req.body.bookId,
          user_id: 1
        })
        .returning('*')
        .then((favs1) => {
          res.send(humps.camelizeKeys(favs1[0]));
        })
      )
  }
});


router.delete('/', (req, res, next) => {
  if (!req.cookies.token) {
    return next(boom.create(401, "Unauthorized"))
  }
  knex('favorites')
  .where('book_id', req.body.bookId)
  .returning(['book_id', 'user_id'])
  .del()
  .then((favs) => {
    res.send(humps.camelizeKeys(favs[0]))
  })
})


module.exports = router;
