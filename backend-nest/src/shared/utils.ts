import * as bcrypt from 'bcrypt';
// https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts
import constants from './../config/constants';

export const validatePassword = async (currentPassword, userPassword) => {
  return bcrypt.compare(currentPassword, userPassword);
};

export const hashPassword = async (password) => {
  return bcrypt.hash(password, constants.bcryptSaltRounds);
};
