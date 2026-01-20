import { createUser, readUsers, readUserById, updateUserById, deleteUserById } from '../services/users.services.js';
import { userSchema } from '../schemas/user.schema.js';

export const addUser = async (req, res) => {
  try {
    // validasi selain password
    const validated = userSchema.parse(req.body);

    const newUser = await createUser(validated);

    res.status(200).json({
      message: 'new user added successfully',
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'failed to create a new user'
    })
  }
}

export const allUsers = async (req, res, next) => {
  try {
    const data = await readUsers();
    res.status(200).json({
      message: 'data dari database',
      data: data,
      total: data.length,
    });
  } catch (error) {
    next(error)
  }
}

export const userById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userById = await readUserById(id);
    res.status(200).json({
      message: 'data ditemukan',
      data: userById,
    });
  } catch (err) {
    next(err);
  }
}

export const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updateUser = await updateUserById(id, payload);

    return res.status(200).json({
      message: `user dengan id ${id} berhasil diupdate`,
      data: updateUser,
    });
  } catch (err) {
    next(err);
  }
}

export const deleteById = (req, res, next) => {
  try {
    const { id } = req.params;
    const data = deleteUserById(id);
    return res.status(200).json({
      message: 'user berhasil dihapus',
      data: data
    });
  } catch (err) {
    next(err);
  }
}