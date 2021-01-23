const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const enums = require("./enums");
const configs = require("./configs");
const User = require("./schemas/user");

const { auth } = require("./auth");
const db = configs.get(process.env.NODE_ENV);

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(enums.msgs.DB_CONNECT);
  }
);

app.get("/", (req, res) => res.status(200).send(enums.msgs.APP_CONNECT));

const port = process.env.port || 1026;
const http = require("http").createServer(app);
const server = http.listen(port, () =>
  console.log(`${enums.msgs.SERVER_CONNECT} ${port}`)
);

/** apis */
/** user signup */
app.post("/api/signup", (req, res) => {
  const user = {
    ...req.body,
    dateCreated: new Date(),
    active: true,
  };
  const newuser = new User(user);

  User.findOne(
    { username: newuser.username, email: newuser.email },
    (err, user) => {
      if (user)
        return res.status(400).json({
          success: false,
          errMessage: enums.errs.USER_EXIST,
        });

      newuser.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            success: false,
            errMessage: err,
          });
        }
        res.status(200).json({
          success: true,
          token: doc.token,
        });
      });
    }
  );
});
