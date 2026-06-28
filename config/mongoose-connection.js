const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

mongoose
.connect(`${config.get("MONGODB_URI")}/ecommerce_mini_project`)
.then(() => {
    dbgr(`Mongo DB connected ...`);
})
.catch((error) => {
    dbgr(`Mongo DB connection error : ${error}`);
});

module.exports = mongoose.connection;