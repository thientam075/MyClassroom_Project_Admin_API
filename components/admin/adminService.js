const model = require('./adminModel');

module.exports.IsExist = async (email) => {
    const result = await model.findOne({where: {email: email, authType: "local"}});
    return result;
}

module.exports.register = async (data) => {
    await data.save();
}
module.exports.getListAdmin = async () => {
    return await model.findAll({attributes: ['id', 'email', 'fullname', 'isBan', 'role', 'createdAt']});
}