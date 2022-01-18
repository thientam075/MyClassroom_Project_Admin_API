const Class = require("./classModel");
const UserInClass = require("../user_in_class/user_in_classModel");
const User = require("../users/userModel");

module.exports.listClass = async (user) => {
  const result = await User.findByPk(user.id, { include: Class });
  return result;
};
module.exports.listAllClass = async () => {
  const result = await Class.findAll();
  return result;
};
module.exports.addClass = async (user, name, subject) => {
  let checkCodeStudent=0 ;
  let checkCodeTeacher=0 ;
  let codeStudent;
  let codeTeacher;
  while (checkCodeStudent==0||checkCodeStudent!=null) {
    codeStudent=generateClassCode(8);
    checkCodeStudent=await Class.findOne({
        where: { inviteCodeStudent: codeStudent },
      });
  }
  
  while (checkCodeTeacher==0||checkCodeTeacher!=null) {
    codeTeacher=generateClassCode(8);
    checkCodeTeacher=await Class.findOne(
        {
            where: { inviteCodeTeacher:codeTeacher },
          });
  }
  const cls = await Class.create({
    name: name,
    subject: subject,
    inviteCodeTeacher: codeTeacher,
    inviteCodeStudent: codeStudent,
  });
  await UserInClass.create({ role: 2, UserId: user.id, ClassId: cls.id });
};

module.exports.removeClass = async (userID, classID) => {
  const result = await UserInClass.findOne({
    where: { UserId: userID, ClassId: classID },
  });
  if (result) {
    if (result.role === 2) {
      UserInClass.destroy({ where: { ClassId: classID } });
      Class.destroy({ where: { id: classID } });
    } else {
      UserInClass.destroy({ where: { UserId: userID, ClassId: classID } });
    }
  }
};

module.exports.getClass = async (id) => {
  const result = await Class.findOne({
    where: {
      id: id,
    },
  });
  return result;
};

module.exports.getRoleClass = async (classID, userID) => {
  const result = await UserInClass.findOne({
    where: { ClassId: classID, UserId: userID },
  });
  return result;
};

function generateClassCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
