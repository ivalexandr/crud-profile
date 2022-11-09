import { Injectable } from '@nestjs/common';
import { UpdateDts } from 'src/users/dto/update.dts';
import { User } from 'src/users/entites/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async updateUser(updateInfo: UpdateDts, req: User) {
    return await this.usersService.updateInfo(updateInfo, req.email);
  }
}
