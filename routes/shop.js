const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const { renderRegisterLogin, renderShop, renderAdminLogin } = require('../controllers/shop');

router.get('/', renderRegisterLogin);

router.get('/shop', renderShop);

router.get('/admin', renderAdminLogin);

module.exports = router;