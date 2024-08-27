import { UserType, UserLoginType } from '../Schemas/UserSchema';
import { User } from '../model/user.model';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

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

export const loginUserServices = async (user: UserLoginType) => {
  try {
    const userFound = await User.findOne({ where: { username: user.username } });

    if (!userFound) {
      throw new Error('Usuario no encontrado');
    }

    const passwordMatch = bcrypt.compareSync(user.password, userFound.password);

    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta');
    }

    if(userFound.state === false) {
      throw new Error('El Usuario se encuentra inactivo');
    }

    return userFound;
  } catch (error) {
    throw error;
  }
}

export const getUserByToken = async (token: string) => {
  try {
    const user = await User.findOne({ where: { username: token } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export const findUserServices = async () => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password', 'password2', 'resetPasswordToken', 'resetPasswordExpires' ] } });
    return users;
  } catch (error) {
    throw error;
  }
}

export const findUserServicesById = async (id: string) => {
  try {
    const user = await User.findOne({ where: { document: id }, attributes: { exclude: ['password', 'password2', 'resetPasswordToken', 'resetPasswordExpires' ] } })
    return user;
  } catch (error) {
    throw error;
  }
}

export const forgotPasswordServices = async (document: number, email: string) => {
  try {
    const user = await User.findOne({ where: { document, email } });

    if (!user) {
      throw new Error('Usuario no encontrado documento o correo invalidos');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export const asignTokenServices = async (token: string, time: Date, document: number) => {
  try {
    const result = await User.update({ resetPasswordToken: token, resetPasswordExpires: time }, 
      { where: { document } });
    
    return result;
  } catch (error) {
    throw error;
  }
}