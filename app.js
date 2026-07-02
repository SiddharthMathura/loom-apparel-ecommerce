const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const productRouter = require('./routes/productRouter');
const shop = require('./routes/shop');
require('dotenv').config();
const expressSession = require('express-session');
const flash = require('connect-flash');

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
app.use('/products', productRouter);
app.use('/admins', adminRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running @ ${process.env.PORT} PORT ... `);
});