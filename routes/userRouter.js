const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { authenticateUser } = require('../middlewares/authenticateUser');
const { addProductsToCart } = require('../controllers/cart');

router.get('/', (req, res) => {
    res.send('user Router');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/add-to-cart/:productId', authenticateUser, addProductsToCart);

module.exports = router;