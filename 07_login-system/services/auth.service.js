import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { insertUser, getUserByEmail } from '../repository/users.repository.js';
import { generateToken } from '../utils/jwt.js';

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
    address,
    role: roleDefault,
    created_at: new Date(),
  }

  return await insertUser(newUser);
}

export const login = async ({ email, password }) => {
  // panggil fungsi mencari user berdasarkan email tertentu
  const user = await getUserByEmail(email);

  // logika jika email yand diinputkan tidak ada di dalam database
  if (!user) {
    throw new Error("Email or password incorrect");
  }

  // mengecek password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('email or password incorrect');
  }

  // buat token
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  delete user.password;

  return { user, token };
}