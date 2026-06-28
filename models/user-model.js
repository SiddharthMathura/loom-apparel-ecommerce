const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    contact: {
        type: Number,
    },
    profilePicture: {
        type: String,
    },
    cart: {
        type: Array,
        default: [],
    },
    orders: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('user' , userSchema);