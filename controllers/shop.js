const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const adminModel = require("../models/admin-model");
const productModel = require('../models/product-model');

const renderRegisterLogin = async (req, res) => {
    if(req.cookies.token){
        try {
            const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            console.log('render - Register - login : ', user);
            const isUser = await userModel.findOne({_id: user.id}).select('-password');
            const isAdmin = await adminModel.findOne({_id: user.id}).select('-password');
            console.log("isUser : ", isUser);
            console.log("isAdmin : ", isAdmin);
            if (isUser) {
                return res.redirect('/shop')
            }
            if (isAdmin) {
                const registerErrors = {};
                const loginErrors = {};
                return res.render('register-login', {registerErrors, loginErrors});
            }
            res.clearCookie('token');
        } catch (error) {
            res.clearCookie('token');
        }
    }
    const registerErrors = {};
    const loginErrors = {};
    res.render('register-login', {registerErrors : registerErrors, loginErrors: loginErrors});
};

const renderShop = async (req, res) => {
    const allProducts = await productModel.find();
    if(req.cookies.token) {
        try {
            const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            console.log('users - token : ', user);
            const isUser = await userModel.findOne({_id: user.id}).select('-password');
            const isAdmin = await adminModel.findOne({_id: user.id}).select('-password');
            const currentSessionUser = isUser || isAdmin;
            console.log('current seesion :', currentSessionUser);
            if (!currentSessionUser) {
                res.clearCookie('token');
                return res.redirect('/');
            } else {
                return res.render('shop', { userData: isUser , adminData : isAdmin, guestData: null, products: allProducts});
            }
        } catch (error) {
            res.clearCookie('token');
        }
    }
    const guestData = {fullname: 'Guest'};
    return res.render('shop', {guestData, userData: null, adminData: null, products: allProducts});
}

const renderAdminLogin = async (req, res) => {
    const loginErrors = {};
    if(req.cookies.token) {
        try {
            const admin = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            console.log('admin - token : ', admin);
            const isAdmin = await adminModel.findOne({_id: admin.id}).select('-password');
            console.log('current isAdmin :', isAdmin);
            if (isAdmin) {
                return res.redirect('/admins/admin-panel/all-products');
            } else {
                return res.render('admin-login', {loginErrors})
            }
        } catch (error) {
            res.clearCookie('token');
        }
    }
    return res.render('admin-login', {loginErrors});
}

const renderUserUnderContructionPage = async (req, res) => {
    try {
        if(req.user) {
            const userData = await userModel.findOne({_id: req.user.id});
            return res.render('user-under-contruction-page', {userData, adminData: null, guestData: null});
        }
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

const renderAdminUnderContructionPage = async (req, res) => {
    try {
        if(req.admin) {
            const adminData = await adminModel.findOne({_id: req.admin.id});
            return res.render('admin-under-contruction-page', {userData: null, adminData, guestData: null});
        }
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

const renderShopUnderContructionPage = async (req, res) => {
    if(req.cookies.token) {
        try {
            const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            const isUser = await userModel.findOne({_id: user.id}).select('-password');
            const isAdmin = await adminModel.findOne({_id: user.id}).select('-password');
            const currentSessionUser = isUser || isAdmin;
            console.log('current seesion :', currentSessionUser);
            if (!currentSessionUser) {
                res.clearCookie('token');
                return res.redirect('/');
            } else {
                return res.render('shop-under-contruction-page', { userData: isUser , adminData : isAdmin, guestData: null});
            }
        } catch (error) {
            return res.status(500).json({message: "Server Error"});
        }
    }
    const guestData = {fullname: 'Guest'};
    return res.render('shop-under-contruction-page', {guestData, userData: null, adminData: null});
}

module.exports.renderRegisterLogin = renderRegisterLogin;
module.exports.renderShop = renderShop;
module.exports.renderAdminLogin = renderAdminLogin;
module.exports.renderUserUnderContructionPage = renderUserUnderContructionPage;
module.exports.renderAdminUnderContructionPage = renderAdminUnderContructionPage;
module.exports.renderShopUnderContructionPage = renderShopUnderContructionPage;