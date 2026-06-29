const express = require('express');
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

router.get('/', (req, res) => {
    const registerErrors = {};
    const loginErrors = {};
    res.render('register-login', {registerErrors : registerErrors, loginErrors: loginErrors});
});

router.post('/register', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const cleanFullName = fullname.trim();
        const cleanEmail = email.trim();
        const registerErrors = {};
        const loginErrors = {};
        if(cleanFullName === '' ){
            registerErrors.fullname = "Name Cannot Be Empty."
        }
        if(cleanEmail === ''){
            registerErrors.email = "Email Cannot Be Empty."
        }
        if(password === ''){
            registerErrors.password = "Password Cannot Be Empty."
        }
        if (Object.keys(registerErrors).length > 0) {
            return res.render('register-login', {registerErrors, loginErrors});
        }
        const existingUser = await userModel.findOne({email: cleanEmail});
        if (existingUser) {
            return res.status(500).json({message: "User Already Exists."});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const createUser = await userModel.create({
            fullname: cleanFullName,
            email: cleanEmail,
            password: hashPassword
        });
        const token = jwt.sign({email: cleanEmail, id: createUser._id}, process.env.SECRET_KEY);
        res.cookie('token', token);
        res.redirect('/shop');
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const cleanEmail = email.trim();
        const registerErrors = {};
        const loginErrors = {};
        if (cleanEmail === '') {
            loginErrors.email = "Email Cannot Be Empty.";
        }
        if (password === ''){
            loginErrors.password = "Password Cannot Be Empty.";
        }
        if (Object.keys(loginErrors).length > 0) {
            return res.render('register-login', {registerErrors, loginErrors});
        }
        const existingUser = await userModel.findOne({email: cleanEmail});
        if (!existingUser) {
            return res.status(500).json({message: "Something Went Wrong."})
        }
        console.log('existing User :', existingUser)
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Something went wrong...",
            });
        }
        const token = jwt.sign({email: cleanEmail, id: existingUser._id}, process.env.SECRET_KEY);
        res.cookie('token', token);
        res.redirect('/shop');
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
});

router.get('/shop', (req, res) => {
    res.send('shop page');
});

module.exports = router;