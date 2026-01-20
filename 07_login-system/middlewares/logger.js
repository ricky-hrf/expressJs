const log = (req, res, next) => {
  const waktu = new Date().toLocaleTimeString();
  console.log(`(${waktu}) dilakukan request: ${req.method} ${req.url}`);
  next();
}

export default log;