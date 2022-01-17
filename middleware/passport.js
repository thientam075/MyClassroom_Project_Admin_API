const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Admin = require("../components/admin/adminModel");
const bcrypt = require("bcrypt");

// Local Strategy
passport.use(new LocalStrategy(
  {usernameField: "email", passwordField: "password"},
  function(email, password, done) {
    console.log("email ", email);
    console.log("password ", password);
    Admin.findOne({where: {email: email,  isBan: false} }).then(admin => {
      if(admin){
        if(bcrypt.compareSync(password, admin.password)){
          done(null, admin);
        }else{
          done(null,false, {message: "Mật khẩu không đúng"});
        }
      }else{
        done(null,false, {message: "Email không tồn tại hoặc chưa kích hoạt hoặc bị cấm"});
      }
    });
  }
));

// JWT Strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwt_payload, done) {
      try {
        console.log(jwt_payload);
        const admin = await Admin.findOne({
          where: { id: jwt_payload.id },
        });
        if (!admin) return done(null, false);
        else return done(null, admin);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
// config serializeUser
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});