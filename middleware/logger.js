const moment = require("moment");

const logger = (req, _res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moment().format()}`
  );
  // pass it on to the next middleware in the chain
  next();
};

module.exports = logger;
