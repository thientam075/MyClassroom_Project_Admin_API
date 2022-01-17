const model = require("./userModel");



module.exports.findUserByIDStudent = async (idStudent) => {
  const result = await model.findOne({where: {IDstudent: idStudent} });
  return result;
}

module.exports.getUser = async (id) => {
  const result = await model.findOne({ where: {id: id }});
  return result;
};

module.exports.getByStudentId = async (studentId) => {
  const result = await model.findOne({ where: {IDstudent: studentId }});
  return result;
};

module.exports.getByEmail = async (email) => {
  const result = await model.findOne({ where: {email: email, authType: 'local'}});
  return result;
};

module.exports.deleteUser = async (id) => {
  await model.destroy({
    where: {
      id: id,
    },
  });
};
module.exports.listUser = async () => {
  const result = await model.findAll();
  return result;
};

module.exports.editUserInfo = async (id, info) => {
  const result = await model.update(
    {
      fullname: info.fullname || "",
      // email: info.email || "",
    },

    { where: { id: id } }
  );
  return result;
};

module.exports.editIdStudent = async (id, idStudent) => {
  return await model.update(
    {
      IDstudent: idStudent
    },

    { where: { id: id } }
  )
}

module.exports.updatePassword= async (id, newPass) => {
  return await model.update(
    {
      password:newPass
    },
    { where: { id } }
  )
}

module.exports.updatePasswordbyEmail= async (email, newPass) => {
  return await model.update(
    {
      password:newPass
    },
    { where: { email: email, authType: 'local' } }
  )
}
module.exports.ActiveAccount = async (id) => {
  return await model.update(
    {
      isActive: true,
    },{
      where: { id }
    }
  )
}

