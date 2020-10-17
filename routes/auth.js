require('dotenv').config()
var express = require('express');
var router = express.Router();
const model = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { APP_SECRET_KEY } = process.env

/* LOGIN */
router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await model.users.findOne({
      where: {
        email: email
      }
    });
    if (user) {
      const compare = await bcrypt.compare(password, user.dataValues.password);
      if (compare) {
        // Create Api Key
        jwt.sign({ user }, APP_SECRET_KEY, (err, token) => {
          if (!err) {
            res.json({
              'status': 'success',
              'messages': 'Welcome',
              'data': { apiKey: token },
            })
          } else {
            throw new Error('Unable to sign in at this time, try for a few moments');
          }
        })
      } else {
        throw new Error('Error password');
      }
    } else {
      throw new Error('oops user not found');
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

module.exports = router;
