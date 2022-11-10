import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { appConfig } from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => ({
    secret: appConfig().JwtSecret,
    signOptions: { expiresIn: '3600s' },
  }),
};
