import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { insertUser } from '../repository/users.repository';

export const register = async ({ fullname, email, password, confirmPassword, address }) => {

  // confirmasi password
  if (password !== confirmPassword) {
    throw new error("confirmPassword doesn't match");
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

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