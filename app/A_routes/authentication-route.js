const express = require('express');
const bodyParser = require('body-parser');
const AuthenticationController = require('../B_controllers/authentication-controller');

const router = express.Router();

router.use(bodyParser.json()); // parse requests of content-type: application/json
router.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type: application/x-www-form-urlencoded

router.post('/signup', AuthenticationController.signUp); // 회원가입
router.post('/login', AuthenticationController.login); // 로그인

module.exports = router;