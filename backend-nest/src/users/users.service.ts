import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { validatePassword, hashPassword } from 'src/shared/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async findByLogin({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await validatePassword(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ email }: any): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // check if the user exists in the db
    const userInDb = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    const newUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword,
      username: createUserDto.username,
    });

    return await newUser.save();
  }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }
}
