const log = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`at [${time}] has request: ${req.method} ${req.url}`);
  next();
}

export default log;