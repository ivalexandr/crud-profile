import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateAuthDto } from 'src/auth/dto/create.auth.dto';
import { User } from './entites/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CreateAuthDto],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
