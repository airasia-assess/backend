const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const appRouter = require("./routers/app-router");
const authRouter = require("./routers/auth-router");
const permissionRouter = require("./routers/permission-router");
const roleRouter = require("./routers/role-router");
const enums = require("./enums");
const configs = require("./configs");
const cors = require("cors");

const db = configs.get(process.env.NODE_ENV);
const corsConfig = {
  origin: true,
  credentials: true,
};

const app = express();
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
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
app.use("/api/permission", permissionRouter);
app.use("/api/role", roleRouter);

const port = process.env.PORT || 1026;
app.listen(port, () => console.log(`${enums.msgs.SERVER_CONNECT} ${port}`));
