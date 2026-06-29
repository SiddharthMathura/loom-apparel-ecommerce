const jwt = require('jsonwebtoken');
const generateJwtToken = (user) => {
    return jwt.sign({email: user.email, id: user._id}, process.env.SECRET_KEY);
};

module.exports.generateJwtToken = generateJwtToken;