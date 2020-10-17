var express = require('express');
var router = express.Router();
const model = require('../models/index');
const bcrypt = require('bcryptjs')
const bcryptSalt = bcrypt.genSaltSync(10)
const auth = require('../middlewares/auth');

// GET users listing.
router.get('/', auth, async function (req, res, next) {
  try {
    const users = await model.users.findAll({});
    if (users.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': users
      })
    } else {
      throw new Error('oops');
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});

// POST users
router.post('/', async function (req, res, next) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    const check = await model.users.findOne({ email }, {
      where: { email }
    });
    if (!check) {
      const hashPassword = bcrypt.hashSync(password, bcryptSalt);
      const users = await model.users.create({
        name,
        email,
        password: hashPassword,
      });
      if (users) {
        res.status(201).json({
          'status': 'OK',
          'messages': 'User berhasil ditambahkan',
          'data': users,
        })
      } else {
        throw new Error('oops');
      }
    } else {
      throw new Error('Already registered');
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

// UPDATE users
router.patch('/:id', auth, async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const { name } = req.body;
    const users = await model.users.update({ name }, {
      where: {
        id: usersId
      }
    });
    if (users) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil diupdate',
        'data': users,
      })
    } else {
      throw new Error('oops');
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

// DELETE users
router.delete('/:id', auth, async function (req, res, next) {
  try {
    const usersId = req.params.id;
    const users = await model.users.destroy({
      where: {
        id: usersId
      }
    })
    if (users) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil dihapus',
        'data': users,
      })
    } else {
      throw new Error('oops');
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
