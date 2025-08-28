import { ConfigType } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Inject  } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthJwtPayload } from '../types/auth-jwtPayload';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret || 'your-fallback-secret',
    });
  }

  async validate(payload: AuthJwtPayload) {
    return payload;
  }
}