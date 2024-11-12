import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
