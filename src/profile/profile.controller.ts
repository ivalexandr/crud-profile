import {
  Controller,
  Get,
  UseGuards,
  Body,
  Request,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateDts } from 'src/users/dto/update.dts';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profleService: ProfileService) {}
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user')
  async updateProfile(@Request() req, @Body() body: UpdateDts) {
    //eslint-disable-next-line
    const { password, ...user } = await this.profleService.updateUser(
      body,
      req.user,
    );
    return user;
  }
}
