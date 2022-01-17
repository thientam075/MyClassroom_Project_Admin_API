const jwt = require('jsonwebtoken');

module.exports.JWTSign = function(userID){
    return jwt.sign({id: userID}, process.env.SECRET_KEY,{ expiresIn: '12h' });
}