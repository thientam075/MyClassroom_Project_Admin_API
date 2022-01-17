const userInClassModel = require("./user_in_classModel");
const userModel = require("../users/userModel");
const classModel = require("../class/classModel");
module.exports.getCreatorInClass = async (classId) => {
  const creatorId = await userInClassModel.findAll({
    where: {
      ClassId: classId,
      role: 2,
    },
    attributes: ["UserId"],
  });

  if (creatorId.length != 0)
    return await userModel.findAll({
      where: {
        id: creatorId[0].UserId,
      },
    });

  return [];
};

module.exports.getStudentInClass = async (classId) => {
  const studentId = await userInClassModel.findAll({
    where: {
      ClassId: classId,
      role: 0,
    },
    attributes: ["UserId"],
  });

  if (studentId.length != 0) {
    const result = [];
    for (let i = 0; i < studentId.length; i++) {
      const user = await userModel.findAll({
        where: {
          id: studentId[i].UserId,
        },
      });
      if (user.length != 0) result.push(user[0]);
    }
    return result;
  }
  return [];
};

module.exports.getTeacherInClass = async (classId) => {
  const teacherId = await userInClassModel.findAll({
    where: {
      ClassId: classId,
      role: 1,
    },
    attributes: ["UserId"],
  });

  if (teacherId.length != 0) {
    const result = [];
    for (let i = 0; i < teacherId.length; i++) {
      const user = await userModel.findAll({
        where: {
          id: teacherId[i].UserId,
        },
      });

      if (user.length != 0) result.push(user[0]);
    }
    return result;
  }
  return [];
};
module.exports.addStudentToClass = async (userId, codeStudent) => {
  const classId = await classModel.findOne({
    where: {
      inviteCodeStudent: codeStudent,
    },
    attributes: ["id"],
  });
  
  if (classId) {
    const result = await userInClassModel.create({'role': 0, 'UserId': userId, 'ClassId': classId.id})
    return result;
  }
  return classId;
};
module.exports.addTeacherToClass = async (userId, codeTeacher) => {
  const classId = await classModel.findOne({
    where: {
      inviteCodeTeacher: codeTeacher,
    },
    attributes: ["id"],
  });

  if (classId) {
    const result = await userInClassModel.create({'role': 1, 'UserId': userId, 'ClassId': classId.id})
    return result;
  }
  return [];
};
module.exports.getRole = async (userId, classId) => {
  const role = await userInClassModel.findOne({
    where: {
      UserId: userId,
      ClassId: classId,
    },
    attributes: ["role"],
  });
  if(role) return role;
  return null;
}
