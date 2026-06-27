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
    },
    backgroundColor: {
        type: String,
    },
    panelColor: {
        type: String,
    },
    textColor: {
        type: String,
    }
});

module.exports = mongoose.Model('product' , productSchema);