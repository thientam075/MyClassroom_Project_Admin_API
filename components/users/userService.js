const model = require("./userModel");


module.exports.listUser = async () => {
  const result = await model.findAll({
    order: [
      ["id", "ASC"]
    ]
  });
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

module.exports.editIsBan = async (id, ban) => {
  return await model.update(
    {
      isBan: ban
    },

    { where: { id: id } }
  )
}

module.exports.findUserByIDStudent = async (idStudent) => {
  const result = await model.findOne({where: {IDstudent: idStudent} });
  return result;
}