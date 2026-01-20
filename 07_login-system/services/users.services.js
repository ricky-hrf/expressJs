import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { insertUser, allUsers, userById, updateById, softDeleteById } from '../repository/users.repository.js';

export const createUser = async ({ fullname, email, address }) => {
  // default password
  const defaultPassword = "password123";

  // hash password
  const hashPassword = await bcrypt.hash(defaultPassword, 10);

  // default role
  const roleDefault = "user";

  const newUser = {
    id: crypto.randomUUID(),
    fullname,
    email,
    password: hashPassword,
    role: roleDefault,
    address,
    created_at: new Date(),
  }

  return await insertUser(newUser);
}

export const readUsers = async () => {
  return await allUsers();
}

export const readUserById = async (id) => {
  return await userById(id);
}

export const updateUserById = async (id, payload) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(data.password, 10);
  } else {
    delete payload.password;
  }
  const affectedRows = await updateById(id, payload);

  if (affectedRows === 0) {
    return null;
  }

  return await userById(id)
}

export const deleteUserById = async (id) => {
  return await softDeleteById(id);
}