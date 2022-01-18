const service = require("./adminService");
const UserService = require("../users/userService");

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

module.exports.banOrUnbanUser = async (req, res, next) => {
    await UserService.editIsBan(parseInt(req.body.id), req.body.ban);

    res.json({
        message: "Successfully"
    })
}