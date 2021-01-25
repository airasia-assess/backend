const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const appRouter = require("./routers/app-router");
const authRouter = require("./routers/auth-router");
const enums = require("./enums");
const configs = require("./configs");

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
      console.log(`${enums.errs.DB_NOT_CONNECT} ${err}`);
      return;
    }
    console.log(enums.msgs.DB_CONNECT);
  }
);

app.use("/", appRouter);
app.use("/api/auth", authRouter);

const port = process.env.port || 1026;
const http = require("http").createServer(app);
http.listen(port, () =>
  console.log(`${enums.msgs.SERVER_CONNECT} ${port}`)
);

module.exports = app;