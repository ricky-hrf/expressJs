const validate = (req, res, next) => {
  const { author, title, created_at, article } = req.body;

  if (title !== undefined && typeof title !== 'string') {
    return res.status(400).json({
      message: 'title harus berupa string'
    });
  }
  next();
}

export default validate;