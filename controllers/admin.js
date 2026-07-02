const renderAdminPanel = (req, res) => {
    const adminData = req.admin;
    res.render('admin-panel', {adminData: adminData, userData : null});
}

module.exports.renderAdminPanel = renderAdminPanel;