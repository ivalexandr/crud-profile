import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TPayload } from './types/payloadJwt.type';
import { UsersService } from 'src/users/users.service';
import { appConfig } from 'src/config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().JwtSecret,
    });
  }

  async validate(payload: TPayload) {
    //eslint-disable-next-line
    const { password, ...user } = await this.userService.findUser(
      payload.username,
    );
    return user;
  }
}
