const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');
const { contextsKey } = require('express-validator/lib/base');

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
});

// router detail isi tabel
router.get('/(:id)', function (req, res) {
  let id = req.params.id;
  connection.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    }

    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Post Tidak Ditemukan',
      })
    } else {
      return res.status(200).json({
        status: true,
        message: 'Detail Data Post',
        data: rows[0]
      });
    }
  });
});

// route untuk update data tabel
router.patch('/update/:id', [
  // kita validasi dulu
  body('title').notEmpty(),
  body('content').notEmpty()
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  // id post
  let id = req.params.id;

  // data post
  let formData = {
    title: req.body.title,
    content: req.body.content
  }

  // update query
  connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Update Data Successfully!'
      });
    }
  });
});

// route untuk delete data pada tabel
router.delete('/delete/(:id)', function (req, res) {
  let id = req.params.id;
  connection.query(`DELETE FROM posts WHERE id = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    } else {
      return res.status(200).json({
        status: true,
        message: 'Delete Data Successfully!',
      })
    }
  })
});

module.exports = router;