var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var applicationDatabase = require("./routes/applicationDatabase");
var interviewDatabase = require("./routes/interviewDatabase");
var userDatabase = require("./routes/userDatabase");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// applications
app.use("/applicationDatabase", applicationDatabase);
app.use("/applicationDatabase/delete", applicationDatabase);
app.use("/applicationDatabase/add", applicationDatabase);
app.use("/applicationDatabase/post/getEmail", applicationDatabase);
// interviews
app.use("/interviewDatabase", interviewDatabase);
app.use("/interviewDatabase/delete", interviewDatabase);
app.use("/interviewDatabase/add", interviewDatabase);
app.use("/interviewDatabase/post/getEmail", interviewDatabase);
// users
app.use("/userDatabase", userDatabase);
app.use("/userDatabase/add", userDatabase);
app.use("/userDatabase/put", userDatabase);
app.use("/userDatabase/post/getEmail", userDatabase);
app.use("/userDatabase/post/validateLogin", userDatabase);
app.use("/userDatabase/post/validateSignup", userDatabase);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render("error");
});

module.exports = app;
