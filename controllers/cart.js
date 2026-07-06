const userModel = require('../models/user-model');

const addProductsToCart = async ( req, res) => {
    try {
        const user = await userModel.findOne({_id: req.user.id});
        const targetedProductId = req.params.productId;
        const existingCartProduct = user.cart.find((product) => product.productId.toString() === targetedProductId);
        if(existingCartProduct) {
            existingCartProduct.quantity += 1;
            await user.save();
            req.flash('success', 'Cart Updated.');
            return res.redirect('/users/cart');
        } else {
            user.cart.push({productId : targetedProductId});
            quantity: 1
            await user.save();
            req.flash('success', 'Product Added To Cart.');
            return res.redirect('/shop');
        }
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

const removeFromCart = async ( req, res) => {
    try {
        const user = await userModel.findOne({_id: req.user.id});
        const targetedProductId = req.params.productId;
        const existingCartProduct = user.cart.find((product) => product.productId.toString() === targetedProductId);
        if (existingCartProduct.quantity === 1) {
            user.cart.pop({productId : targetedProductId});
            quantity: 1
            await user.save();
            req.flash('success', 'Product Removed From Cart.');
            return res.redirect('/users/cart');
        }
        if (existingCartProduct.quantity > 1) {
            existingCartProduct.quantity -= 1;
            await user.save();
            req.flash('success', 'Cart Updated.');
            return res.redirect('/users/cart');
        }
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

const renderCart = async (req, res) => {
    try {
        const userData = await userModel.findOne({_id: req.user.id}).select('-password').populate('cart.productId');
        return res.render('cart', {userData: userData, adminData: null, guestData: null});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
}

const placeOrder = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.user.id}).select('-password').populate('cart.productId');
        if (!user || user.cart.length === 0) {
            req.flash('error', 'Your Cart Is Empty.');
            return res.redirect('/shop');
        }
        let billTotal = 0;
        let deliveryCharges = 49
        user.cart.forEach(product => {
            const price = product.productId.productPrice;
            const qty = product.quantity;
            billTotal += (price * qty);
        });
        let finalAmountToPay = billTotal + deliveryCharges;
        user.orders.push({
            items: user.cart,
            totalAmount: finalAmountToPay,
            purchaseDate: new Date()
        });
        user.cart = []; 
        await user.save();
        req.flash('success', 'Order processed successfully!');
        return res.redirect('/users/all-orders');
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
};

module.exports.addProductsToCart = addProductsToCart;
module.exports.removeFromCart = removeFromCart;
module.exports.renderCart = renderCart;
module.exports.placeOrder = placeOrder;