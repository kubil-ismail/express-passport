require('dotenv').config();
const { APP_SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (typeof header !== 'undefined') {
      jwt.verify(header, APP_SECRET_KEY, function (err) {
        if (err) {
          throw new Error('Api key Error');
        } else {
          next()
        }
      })
    } else {
      throw new Error('Api key cannot be empty');
    }
  } catch (err) {
    res.status(401).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
}

module.exports = auth
