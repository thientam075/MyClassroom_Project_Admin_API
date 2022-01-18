const service = require("./adminService");
const UserService = require("../users/userService");
const ClassService=require("../class/classService");

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
    });
}

module.exports.updateStudentId = async (req, res, next) => {
    if (req.body.id && req.body.studentId) {
        const haveUser = await UserService.findUserByIDStudent(req.body.studentId);
        if (haveUser) {
          res.json({ result: 0 });
        } else {
          const result = await UserService.editIdStudent(parseInt(req.body.id), req.body.studentId);
          if (result) res.json({ result: 1 });
          else res.json({ result: -1 });
        }
    } 
    else res.json({ result: -1 });
}

module.exports.listAllClass = async function(req, res, next){
    const result = await ClassService.listAllClass();
    res.json({
        data: result,
    })
}