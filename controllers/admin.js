const productModel = require('../models/product-model');

const renderAdminProducts = async (req, res) => {
    try {
        const adminData = req.admin;
        const allProducts = await productModel.find();
        res.render('admin-products', {adminData: adminData, userData : null, guestData: null, products: allProducts});
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
};

const renderAdminCreateProducts = (req, res) => {
    const adminData = req.admin;
    res.render('admin-create-products', {adminData: adminData, userData : null, guestData: null});
};

const createProduct = async (req, res) => {
    const productName = req.body.productName;
    const productPrice = Number(req.body.productPrice);
    const discountPrice = Number(req.body.discountPrice);
    const productImage = req.file.buffer;
    try {
        const createdProduct = await productModel.create({
            productName,
            productPrice,
            discountPrice,
            productImage,
        });
        req.flash('success', 'New Product Created.');
        res.redirect('/admins/product/create')
    } catch (error) {
        return res.status(500).json({message: "Server Error"});
    }
};

const deleteAllProducts = async (req, res) => {
    try {
        const result = await productModel.deleteMany({});
        res.redirect('/admins/admin-panel/all-products');
    } catch (error) {
        res.status(500).json({message:'Internal Server Error: Failed to wipe products.'});
    }
};

module.exports.renderAdminProducts = renderAdminProducts;
module.exports.renderAdminCreateProducts = renderAdminCreateProducts;
module.exports.createProduct = createProduct;
module.exports.deleteAllProducts = deleteAllProducts;