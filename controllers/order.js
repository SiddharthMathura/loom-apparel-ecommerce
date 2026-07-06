const userModel = require('../models/user-model');

const renderOrderPage = async (req, res) => {
    const userData = await userModel.findOne({_id: req.user.id}).select('-password').populate([
        {
            path: 'orders.items.productId', // Deep-populates past order history items
            model: 'product'
        }
    ]);
    return res.render('order', {userData: userData, adminData: null, guestData: null});
}

const deleteOrderHistory = async (req, res) => {
    const result = await userModel.updateOne(
            { _id: req.user.id },
            { $set: { orders: [] } }
        );

        if (result.matchedCount === 0) {
            req.flash('error', 'User Not Found.');
            return res.redirect('/');
        }

        req.flash('success', 'User Order History Cleared Successfully.');
        return res.redirect('/users/all-orders');
}

module.exports.renderOrderPage = renderOrderPage;
module.exports.deleteOrderHistory = deleteOrderHistory;