const Class = require("./classModel");

module.exports.listAllClass = async () => {
  const result = await Class.findAll();
  return result;
};