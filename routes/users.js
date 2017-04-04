// 'use strict';
//
// const express = require('express');
//
// // eslint-disable-next-line new-cap
// const router = express.Router();
// const knex = require('../knex');
// const humps = require('humps');
// const bcrypt = require('bcrypt');
//
// // YOUR CODE HERE
//
// router.post('/users', (req, res, next) => {
//   knex('users')
//   .then(users) => {
//     .returning(['id', 'first_name', 'last_name', 'email'])
//     .insert({
//       'first_name': req.body.firstName,
//       'last_name': req.body.lastName,
//       'email': req.body.email,
//       'hashed_password': bycrypt.hashSync(req.body.password, 8)
//     })
//     .then((users1) => {
//       re.json(humps.camelizeKeys(users1[0]));
//     })
//   }
// })
//
// module.exports = router;
//

'use strict';
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const humps = require('humps');
const bcrypt = require('bcrypt');
router.post('/users', (req, res, next) => {
  knex('users')
  .then((users) => {
    knex('users')
    .returning(["id", "first_name", "last_name", "email"])
      .insert({
        'first_name': req.body.firstName,
        'last_name': req.body.lastName,
        'email': req.body.email,
        'hashed_password': bcrypt.hashSync(req.body.password, 8)
                })
                .then((users1) => {
                  res.json(humps.camelizeKeys(users1[0]));
                })
  })
});
module.exports = router;
