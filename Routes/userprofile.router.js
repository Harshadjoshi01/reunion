const express = require('express');
const router = express.Router();
const {getuserfollowing, unfollow, getuserprofile} = require('../controllers/userprofile.controller');
const {verifyAccessToken} = require('../validators/jwtvalidation');

router.post('/follow/:id', verifyAccessToken, getuserfollowing);
router.post('/unfollow/:id', verifyAccessToken, unfollow);
router.get('/user', verifyAccessToken, getuserprofile);

module.exports = router;