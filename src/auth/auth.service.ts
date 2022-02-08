import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { sign } from 'jsonwebtoken';
import { Payload } from './payload';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        ){} // private configService: ConfigService

    async signPayload(payload: Payload) {
        // const secret = this.configService.get('JWT_KEY')
        return sign(payload, 
            process.env.JWT_KEY,
            { expiresIn: '7d' }); //process.env.JWT_KEY //"success"
      }

      async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
      }  
}