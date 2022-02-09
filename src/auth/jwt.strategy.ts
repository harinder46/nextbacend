import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AuthService } from "./auth.service";
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';
import { LoginDTO } from './login.dto';
import { Payload } from './payload';


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService,
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
        })
    }

    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
          return done(
            new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
            false,
          );
        }
        return done(null, user, payload.iat);
      }

} 