import { register } from "../services/auth.service";
import { userSchema } from "../schemas/user.schema";

export const addUser = async (req, res) => {
  try {
    // validasi selain password
    const validate = userSchema.parse(req.body);

    const newUser = await register(validate);
  } catch (err) {
    res.status(500).json({
      message: 'failed to create a new user'
    })
  }
}