import * as bcrypt from 'bcrypt';
// https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts
import constants from './../config/constants';
import keys from './../config/keys';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as sanitizeHTML from 'sanitize-html';

export const validatePassword = async (currentPassword, userPassword) => {
  return bcrypt.compare(currentPassword + keys.passHashSecret, userPassword);
};

export const hashPassword = async (password) => {
  return bcrypt.hash(
    password + keys.passHashSecret,
    constants.bcryptSaltRounds,
  );
};

export const sanitizeMongo = function (textJSON: string) {
  if (textJSON.includes('$')) {
    throw new HttpException('Invalid character: $', HttpStatus.BAD_REQUEST);
  } else {
    return textJSON.substring(1, textJSON.length - 1);
  }
};

export const sanitize = function (text: string): string {
  return sanitizeHTML(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
};
