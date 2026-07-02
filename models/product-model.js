const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0,
    },
    productImage: {
        type: String,
    }
});

module.exports = mongoose.model('product' , productSchema);