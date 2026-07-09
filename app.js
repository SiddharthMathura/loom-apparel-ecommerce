const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const shop = require('./routes/shop');
require('dotenv').config();
const expressSession = require('express-session');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user-model');
const adminModel = require('./models/admin-model');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', shop);
app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use(async (req, res, next) => {
    if(req.cookies.token) {
        try {
            const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
            const isUser = await userModel.findOne({_id: user.id}).select('-password');
            const isAdmin = await adminModel.findOne({_id: user.id}).select('-password');
            if (isUser) {
                return res.render('not-found-page', { userData: isUser , adminData : null, guestData: null});
            }
            if (isAdmin) {
                return res.render('not-found-page', { userData: null , adminData : isAdmin, guestData: null});
            }
        } catch (error) {
            return res.status(500).json({message: "Server Error"});
        }
    }
    const guestData = {fullname: 'Guest'};
    return res.render('not-found-page', {guestData, userData: null, adminData: null});
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running @ ${process.env.PORT} PORT ... `);
});