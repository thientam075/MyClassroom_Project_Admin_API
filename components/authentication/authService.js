const model = require('../users/userModel');

module.exports.IsExist = async (email) => {
    const result = await model.findOne({where: {email: email, authType: "local"}});
    return result;
}

module.exports.register = async (data) => {
    await data.save();
}
