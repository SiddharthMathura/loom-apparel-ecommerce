const userModel = require('../models/user-model');

const addProductsToCart = async ( req, res) => {
    try {
        const user = await userModel.findOne({_id: req.user.id});
        console.log(' add to cart - user :', user)
        user.cart.push(req.params.productId);
        await user.save();
        req.flash('success', 'Product Added To Cart.');
        return res.redirect('/shop');
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

module.exports.addProductsToCart = addProductsToCart;