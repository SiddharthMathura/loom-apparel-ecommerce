const userModel = require('../models/user-model');
const adminModel = require('../models/admin-model');
const bcrypt = require('bcrypt');
const { generateJwtToken }  = require('../utils/generateJwtToken');

const registerUser = async (req, res) => {
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
            req.flash('error', 'User Already Exists With This Email.');
            return res.redirect('/');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const createUser = await userModel.create({
            fullname: cleanFullName,
            email: cleanEmail,
            password: hashPassword
        });
        const token = generateJwtToken(createUser);
        res.cookie('token', token);
        res.redirect('/shop');
        } catch (error) {
            return res.status(500).json({message: "Server Error"});
        }
    };

const loginUser = async (req, res) => {
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
            req.flash('error', 'Email Or Password Is Invalid.');
            return res.redirect('/');
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            req.flash('error', 'Email Or Password Is Invalid.');
            return res.redirect('/');
        }
        const token = generateJwtToken(existingUser);
        res.cookie('token', token);
        res.redirect('/shop');
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        req.flash('success', 'You Have Been Logged Out Successfully.');
        res.redirect('/');
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error occurred.",
        });
    }
}

const loginAdmin = async (req, res) => {
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
            return res.render('admin-login', {registerErrors, loginErrors});
        }
        const existingAdmin = await adminModel.findOne({email: cleanEmail});
        if (!existingAdmin) {
            req.flash('error', 'Email Or Password Is Invalid.');
            return res.redirect('/admin');
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            req.flash('error', 'Email Or Password Is Invalid.');
            return res.redirect('/admin');
        }
        const token = generateJwtToken(existingAdmin);
        res.cookie('token', token);
        res.redirect('/admins/admin-panel/all-products');
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
module.exports.loginAdmin = loginAdmin;