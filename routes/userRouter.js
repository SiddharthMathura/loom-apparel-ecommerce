const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authenticateUser');
const { addProductsToCart, renderCart, removeFromCart, placeOrder } = require('../controllers/cart');
const { renderOrderPage, deleteOrderHistory } = require('../controllers/order');
const { renderUserUnderContructionPage } = require('../controllers/shop');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/add-to-cart/:productId', authenticateUser, addProductsToCart);

router.get('/remove-from-cart/:productId', authenticateUser, removeFromCart);

router.get('/cart', authenticateUser, renderCart);

router.get('/order-confirmation', authenticateUser, placeOrder);

router.get('/all-orders', authenticateUser, renderOrderPage);

router.post('/delete-all-order-history', authenticateUser, deleteOrderHistory);

router.get('/account', authenticateUser ,renderUserUnderContructionPage);

module.exports = router;