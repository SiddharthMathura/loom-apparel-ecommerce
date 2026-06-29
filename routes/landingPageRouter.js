const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.get('/', (req, res) => {
    const registerErrors = {};
    const loginErrors = {};
    res.render('register-login', {registerErrors : registerErrors, loginErrors: loginErrors});
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/shop', (req, res) => {
    res.send('shop page');
});

module.exports = router;