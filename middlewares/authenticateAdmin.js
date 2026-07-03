const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin-model');
const authenticateAdmin = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash('error', 'You Must Log In To View This Page.');
        return res.redirect('/admin');
    }
    try {
        const payload = req.cookies.token;
        const verifyAdmin = jwt.verify(payload, process.env.SECRET_KEY);
        const adminData = await adminModel.findOne({ _id : verifyAdmin.id }).select('-password');
        if (adminData) {
            req.admin = adminData;
            next();
        } else {
            req.flash('error', 'Not Authorized To View This Page.');
            return res.redirect('/admin');
        }
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
};
module.exports.authenticateAdmin = authenticateAdmin;