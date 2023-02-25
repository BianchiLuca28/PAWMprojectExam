import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import constants from './../config/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      // Create the user
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db using email and password
    const user: User = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    // Search if a user with the given email exists
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email, username }: User): any {
    const expiresIn = constants.expiryTimeJwt;

    // Creates the token
    const userJwt: JwtPayload = {
      email: email,
      username: username,
    };
    const accessToken = this.jwtService.sign(userJwt);
    return {
      expiresIn,
      accessToken,
    };
  }
}
