const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
    },
    productPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
    productImage: {
        type: Buffer,
    }
});

module.exports = mongoose.model('product' , productSchema);