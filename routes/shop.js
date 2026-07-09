const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const { renderRegisterLogin, renderShop, renderAdminLogin, renderShopUnderContructionPage } = require('../controllers/shop');

router.get('/', renderRegisterLogin);

router.get('/shop', renderShop);

router.get('/admin', renderAdminLogin);

router.get('/new-collections', renderShopUnderContructionPage);

router.get('/all-products', renderShop);

router.get('/discounted-products', renderShopUnderContructionPage);

router.get('/availability', renderShopUnderContructionPage);

router.get('/discount', renderShopUnderContructionPage);

module.exports = router;