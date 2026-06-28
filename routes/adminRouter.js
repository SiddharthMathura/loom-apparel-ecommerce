const express = require('express');
const router = express.Router();
const adminModel = require('../models/admin-model');

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        const existingAdmin = await adminModel.find();
        console.log(existingAdmin);
        if (existingAdmin.length > 0) {
            return res.status(500).json({message : "Permission Denied: Admin Cannot Be Created."});
        }
        const { fullname, email, password, profilePicture } = req.body; 
        const adminCreated = await adminModel.create({
            fullname,
            email,
            password,
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

module.exports = router;