const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const productRouter = require('./routes/productRouter');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/admins', adminRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running @ ${process.env.PORT} PORT ... `);
});