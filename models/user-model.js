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
    contact: {
        type: Number,
    },
    profilePicture: {
        type: String,
        default: 'defaultProfilePicture.PNG'
    },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'Quantity cannot be less than 1.']
            }
        }
    ],
    orders: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model('user' , userSchema);