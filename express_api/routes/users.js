const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require("../controllers/userController");
const { contextsKey } = require('express-validator/lib/base');

router.get("/", userController.getAllUsers);

module.exports = router;