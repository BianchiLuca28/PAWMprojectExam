import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  validatePassword,
  hashPassword,
  sanitize,
  sanitizeMongo,
} from 'src/shared/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async findByLogin({ email, password }: LoginUserDto): Promise<User> {
    const sanitizedEmail = sanitize(sanitizeMongo(JSON.stringify(email)));
    const sanitizedPassword = sanitize(sanitizeMongo(JSON.stringify(password)));
    const user = await this.userModel.findOne({ email: sanitizedEmail });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await validatePassword(sanitizedPassword, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ email }: any): Promise<User> {
    return await this.userModel.findOne({
      email: sanitize(sanitizeMongo(JSON.stringify(email))),
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const sanitizedEmail = sanitize(
      sanitizeMongo(JSON.stringify(createUserDto.email)),
    );
    const sanitizedPassword = sanitize(
      sanitizeMongo(JSON.stringify(createUserDto.password)),
    );
    const sanitizedUsername = sanitize(
      sanitizeMongo(JSON.stringify(createUserDto.username)),
    );

    // check if the user exists in the db
    const userInDb = await this.userModel.findOne({
      email: sanitizedEmail,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(sanitizedPassword);

    const newUser = new this.userModel({
      email: sanitizedEmail,
      password: hashedPassword,
      username: sanitizedUsername,
    });

    return await newUser.save();
  }
}
