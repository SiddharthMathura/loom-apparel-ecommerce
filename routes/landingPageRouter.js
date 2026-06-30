const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authenticateUser');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    if(req.cookies.token){
        try {
            jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            return res.redirect('/shop');
        } catch (error) {
            res.clearCookie('token');
        }
    }
    const registerErrors = {};
    const loginErrors = {};
    res.render('register-login', {registerErrors : registerErrors, loginErrors: loginErrors});
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/shop', (req, res) => {
    res.send('shop page');
});

module.exports = router;