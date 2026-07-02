const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const { renderRegisterLogin, renderShop } = require('../controllers/shop');

router.get('/', renderRegisterLogin);

router.get('/shop', renderShop);

router.get('/admin', (req, res) => {
    const registerErrors = {};
    const loginErrors = {};
    res.render('admin-login', {loginErrors});
});

module.exports = router;