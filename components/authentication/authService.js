const model = require('../admin/adminModel');

module.exports.IsExist = async (email) => {
    const result = await model.findOne({where: {email: email}});
    return result;
}

module.exports.register = async (data) => {
    await data.save();
}
