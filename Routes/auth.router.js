const express = require('express');
const router = express.Router();
const {Login, Register} = require('../controllers/auth.controller');
const  {LoginSchema, RegisterSchema} = require('../helpers/ValidationSchema');
const {JoiValidator} = require('../validators/joivalidator');
const Joi = require('@hapi/joi');


router.post('/authenticate', JoiValidator(LoginSchema), Login);
router.post('/register', JoiValidator(RegisterSchema), Register);

module.exports = router;