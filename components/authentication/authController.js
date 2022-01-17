const service = require("./authService");
const bcrypt = require("bcrypt");
const Admin = require("../admin/adminModel");
const { JWTSign } = require("../../middleware/jwt");

module.exports.register = async (req, res, next) => {
  const { email, password, fullname } = req.body;
  await service
    .IsExist(email)
    .then((user) => {
      if (user) {
        res.json({
          message: "Email đã tồn tại!!!",
          success: false,
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashpass = bcrypt.hashSync(password, salt);
        Admin.create({
          email: email,
          password: hashpass,
          fullname: fullname,
        }).then(data => {
          res.json({
            message: "Đăng ký thành công!!!",
            success: true,
            data: data
          });
        })
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.LoginWithLocal = (req, res) => {
  const token = JWTSign(req.user.id);
  res.json({
    message: "You already login with this email and password",
    user: req.user,
    token: token,
    expAt: new Date().getTime() + 43200000,
  });
};