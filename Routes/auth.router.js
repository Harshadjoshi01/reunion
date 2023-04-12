const express = require('express');
const router = express.Router();
const {Login, Register} = require('../controllers/auth.controller');
const  {LoginSchema, RegisterSchema} = require('../helpers/ValidationSchema');
const Joi = require('@hapi/joi');


router.post('/authenticate', Joi(LoginSchema), Login);
router.post('/register', Joi(RegisterSchema), Register);

module.exports = router;