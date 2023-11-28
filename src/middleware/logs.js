const logRequest = (req, res, next) => {
  console.log("Log request ke PATH:", req.path);
  next();
};

module.exports = logRequest;
