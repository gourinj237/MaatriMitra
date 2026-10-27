const express = require('express');
const router = express.Router();
const { getNewborns, registerNewborn } = require('../controllers/newbornController');

router.route('/')
  .get(getNewborns)
  .post(registerNewborn);

module.exports = router;
