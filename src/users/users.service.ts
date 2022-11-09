import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from 'src/auth/dto/create.auth.dto';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';
import { hash } from 'bcryptjs';
import { UpdateDts } from './dto/update.dts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private async setPassword(password: string, salt: number): Promise<string> {
    return await hash(password, salt);
  }

  async findUser(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async createUser(createUser: CreateAuthDto): Promise<CreateAuthDto> {
    const existedUser = await this.findUser(createUser.username);
    if (existedUser) {
      throw new BadRequestException(
        `User ${createUser.username} already exists`,
      );
    }
    const hashPassword = await this.setPassword(
      createUser.password,
      Number(process.env.SALT),
    );
    const newUser = {
      email: createUser.username,
      password: hashPassword,
      about: '',
      name: '',
      phone: 0,
      address: '',
    };
    await this.usersRepository.insert(newUser);
    return createUser;
  }

  async updateInfo(createData: UpdateDts, email: string) {
    const existedUser = await this.findUser(email);
    if (!existedUser) {
      throw new NotFoundException(`user with email ${email} not found`);
    }
    return await this.usersRepository.save({
      ...existedUser,
      ...createData,
    });
  }
}
