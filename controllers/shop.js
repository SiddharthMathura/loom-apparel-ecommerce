const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const adminModel = require("../models/admin-model");

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
                return res.render('shop', { userData: currentSessionUser , adminData : null});
            }
        } catch (error) {
            res.clearCookie('token');
        }
    }
    const userData = null;
    return res.render('shop', {userData, adminData: null});
}

module.exports.renderRegisterLogin = renderRegisterLogin;
module.exports.renderShop = renderShop;