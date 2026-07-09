const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const authenticateUser = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash('error', 'You Must Log In To View This Page.');
        return res.redirect('/');
    }
    try {
        const payload = req.cookies.token;
        const verifyUser = jwt.verify(payload, process.env.SECRET_KEY);
        const userData = await userModel.findOne({ _id : verifyUser.id }).select('-password');
        if (userData) {
            req.user = userData;
            next();
        } else {
            req.flash('error', 'Not Authorized To View This Page.');
            return res.redirect('/');
        }
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
};
module.exports.authenticateUser = authenticateUser;