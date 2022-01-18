const service = require("./adminService");
const UserService = require("../users/userService");
const ClassService=require("../class/classService")
module.exports.listAdmin = async function(req, res, next){

    const result = await service.getListAdmin();
    res.json({
        data: result,
    })
}

module.exports.listUser = async function(req, res, next){
    const result = await UserService.listUser();
    res.json({
        data: result,
    })
}
module.exports.listAllClass = async function(req, res, next){
    console.log('111111111')
    const result = await ClassService.listAllClass();
    res.json({
        data: result,
    })
}