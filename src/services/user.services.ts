import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { User } from "../model/user.model";
import { UserType } from "../Schemas/UserSchema";

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS as string, 10);
const USERNAME_PREFIX = 'CP';

const generateUsername = (document: string): string => {
  return `${USERNAME_PREFIX}${document}`;
};

const generatePassword = (document: string): string => {
  const threeLastDocument = document.slice(-3);
  const pass = `${USERNAME_PREFIX}${threeLastDocument}`;
  return bcrypt.hashSync(pass, BCRYPT_SALT_ROUNDS);
};

export const registerUserServices = async (user: UserType) => {
  try {
    const username = generateUsername(user.document.toString());
    const password = generatePassword(user.document.toString());
    const state = true;

    await User.sync();
    const userCreated = await User.create({ ...user, username, password, state });

    return userCreated;
  } catch (error) {
    throw error;
  }
};