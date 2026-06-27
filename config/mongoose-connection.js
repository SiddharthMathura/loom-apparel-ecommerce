const mongoose = require('mongoose');
require('dotenv').config();

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
    console.log(`Mongo DB connected ...`);
})
.catch((error) => {
    console.log(`Mongo DB connection error : ${error}`);
});