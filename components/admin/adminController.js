const service = require("./adminService");
const UserService = require("../users/userService");

module.exports.listAdmin = async function(req, res, next){

    const result = service.getListAdmin();
    res.json({
        data: result,
        success: true,
    })
}

module.exports.listUser = async function(req, res, next){
    const result = UserService.listUser();
    res.json({
        data: result,
    })
}