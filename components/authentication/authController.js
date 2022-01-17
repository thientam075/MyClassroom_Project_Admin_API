const service = require("./authService");
const bcrypt = require("bcrypt");
const User = require("../users/userModel");
const { JWTSign } = require("../../middleware/jwt");

module.exports.register = async (req, res, next) => {
  const { email, password, IDstudent, fullname } = req.body;
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
        User.create({
          email: email,
          password: hashpass,
          IDstudent: IDstudent,
          fullname: fullname,
          isActive: false,
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
module.exports.ImportDataGoogle = async (req, res, next) => {
  const { profile } = req.body;
  await User.findOne({
    where: { authGoogleID: profile.googleId, authType: "google" },
  }).then(async (user) => {
    // Check user exist
    if (user) {
      req.user = user;
      return next();
    } else {
      const newUser = new User({
        authType: "google",
        email: profile.email,
        avatar: profile.imageUrl,
        authGoogleID: profile.googleId,
        fullname: profile.familyName + " " + profile.givenName,
        isActive: true,
      });
      await newUser.save();
      req.user = newUser;
      return next();
    }
  });
};
module.exports.LoginWithGoogle = (req, res) => {
  const token = JWTSign(req.user.id);
  res.json({
    message: "You already login with Google",
    token: token,
    expAt: new Date().getTime() + 43200000,
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