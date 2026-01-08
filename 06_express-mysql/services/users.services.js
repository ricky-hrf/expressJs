import crypto from 'crypto';
import { insertUser, allUsers, userById, updateById, deleteById } from '../model/users.model.js';

export const createUser = async ({ fullname, email, password, address }) => {
  const newUser = {
    id: crypto.randomUUID(),
    fullname,
    email,
    password,
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
  const affectedRows = await updateById(id, payload);

  if (affectedRows === 0) {
    return null;
  }

  return await userById(id)
}

export const deleteUserById = async (id) => {
  return await deleteById(id);
}