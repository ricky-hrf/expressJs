import { register, login } from "../services/auth.service.js";
import { userSchema, loginSchema } from "../schemas/user.schema.js";

export const registerNewUser = async (req, res) => {
  try {
    // validasi selain password
    const validate = userSchema.parse(req.body);

    // buat user baru
    const newUserByRegister = await register(validate);

    // kondisi status respon
    res.status(201).json({
      message: 'new user register successfully',
      data: newUserByRegister,
    });
  } catch (err) {
    res.status(500).json({
      message: 'failed to register a new user'
    })
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const validate = loginSchema.parse(req.body);

    const user = await login(validate);

    res.status(201).json({
      message: 'login successfully',
      data: user,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message || 'login failed',
    });
  }
}