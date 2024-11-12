import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Register a new user
  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({ username, password: hashedPassword });
  }

  // Login a user
  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST
      );
    }

    const payload = { username: user.username, sub: user._id.toString() };
    return { access_token: this.jwtService.sign(payload), payload };
  }
}
