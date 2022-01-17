const service = require('./user_in_classService');

module.exports.listUserInClass = async (req, res, next) => {
  if(req.query.role == "Creator")
  {
    const result = await service.getCreatorInClass(req.params.classId);
    res.json(result);
  }
  else if(req.query.role == "Teacher")
  {
    const result = await service.getTeacherInClass(req.params.classId);
    res.json(result);
  }
  else if(req.query.role == "Student")
  {
    const result = await service.getStudentInClass(req.params.classId);
    res.json(result);
  }
}
module.exports.addStudentToClass = async (req, res, next) => {

  const result=await service.addStudentToClass(req.user.id, req.params.codeStudent);
  res.json(result);
}
module.exports.addTeacherToClass = async (req, res, next) => {

  await service.addTeacherToClass(req.user.id, req.params.codeTeacher);
  res.json('Add successful');
}
module.exports.getRole = async (req, res, next) => {
  
  const result =await service.getRole(req.user.id, req.params.classId);
  res.json(result);
}