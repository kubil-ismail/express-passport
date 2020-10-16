var express = require('express');
var router = express.Router();
const model = require('../models/index');

// GET users listing.
router.get('/', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    const users = await model.users.create({
      name,
      email,
      password,
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
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

// UPDATE users
router.patch('/:id', async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
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
