import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // cek header
  if (!authHeader) {
    return res.status(401).json({
      message: 'unathorization',
    });
  }

  // ambil token
  const token = authHeader.split(' ')[1];

  try {
    // verifikasi token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // simpan data user ke req
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'invalid token'
    });
  }
}