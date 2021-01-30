const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: "mongodb+srv://mongodb:fPVK6QiB0t0qWh72@airasia-assess.g7uey.mongodb.net/airasia-assess?retryWrites=true&w=majority",
  },
  default: {
    SECRET: "secretkey",
    DATABASE:
      "mongodb+srv://mongodb:fPVK6QiB0t0qWh72@airasia-assess.g7uey.mongodb.net/airasia-assess?retryWrites=true&w=majority",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
