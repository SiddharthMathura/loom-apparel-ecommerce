const express = require('express');
const router = express.Router();
const adminModel = require('../models/admin-model');
const { loginAdmin } = require('../controllers/authController');
const { renderAdminPanel } = require('../controllers/admin');
const { authenticateAdmin } = require('../middlewares/authenticateAdmin');
const bcrypt = require('bcrypt');

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        const existingAdmin = await adminModel.find();
        if (existingAdmin.length > 0) {
            return res.status(500).json({message : "Permission Denied: Admin Cannot Be Created."});
        }
        const { fullname, email, password, profilePicture } = req.body; 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const adminCreated = await adminModel.create({
            fullname,
            email,
            password: hashPassword,
            profilePicture
        });
        res.status(201).json({
            message : "Admin Created Successfully.",
            data: adminCreated
        });
    });
}

router.get('/', (req, res)  => {
    res.send('admin Router');
});

router.post('/login', loginAdmin);

router.get('/admin-panel', authenticateAdmin, renderAdminPanel);

module.exports = router;