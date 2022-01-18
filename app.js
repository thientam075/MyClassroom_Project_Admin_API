require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const classRouter = require('./components/class/class');
const userInClassRouter = require('./components/user_in_class/user_in_class');

const authRouter = require('./components/authentication/authRouter');
const avatarRouter =require('./components/avatar/avatarRouter');
const assignmentRouter = require('./components/assignment/assignmentRouter');
const adminRouter = require('./components/admin/adminRouter');
const gradeRouter = require('./components/grade/grade');
const app = express();
const passport = require('passport');
const passportConfig = require('./middleware/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors())

app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth',authRouter);
app.use(passport.authenticate('jwt', {session : false}));
app.use('/admin', adminRouter);
app.use('/class', classRouter);
app.use('/userInClass', userInClassRouter);
app.use('/assignment', assignmentRouter);

app.use('/image', avatarRouter);
app.use('/grade',gradeRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;