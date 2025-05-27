const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

router.get('/', function(req, res) {
  // query
  connection.query('SELECT * FROM posts ORDER BY id desc', function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal server error',
      })
    } else {
      return res.status(200).json({
        status: true,
        message: 'List data posts',
        data: rows
      })
    }
  });
});

router.post('/store', [
  body('title').notEmpty(),
  body('content').notEmpty()
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  let formData = {
    title: req.body.title,
    content: req.body.content
  }

  // insert query
  connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal server error',
      })
    } else {
      return res.status(201).json({
        status: true,
        message: 'Post created successfully',
        data: rows[0]
      })
    }
  })
})

module.exports = router;