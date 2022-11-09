import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { CreateAuthDto } from './dto/create.auth.dto';
import { User } from 'src/users/entites/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  private async comparePassword(
    password: string,
    comparePassword: string,
  ): Promise<boolean> {
    return await compare(password, comparePassword);
  }

  async validateUser(authBody: CreateAuthDto): Promise<User | null> {
    const user = await this.userService.findUser(authBody.username);
    if (!user) {
      throw new NotFoundException(`user ${authBody.username} not found`);
    }
    const compare = await this.comparePassword(
      authBody.password,
      user.password,
    );
    if (compare) {
      return user;
    }
    return null;
  }

  async rigisterUser(createUser: CreateAuthDto): Promise<CreateAuthDto> {
    return await this.userService.createUser(createUser);
  }
}
