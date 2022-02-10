import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { sign } from 'jsonwebtoken';
import { Payload } from './payload';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,

        ){} // private configService: ConfigService

        //        private mailService: MailService,


    // async signUp(payload : Payload) {
    //   const user = await this.userService.findByPayload(payload);
    //   const token = Math.floor(1000 + Math.random()*9000).toString();
    //   await this.mailService.SendUserConfirmation(user, token);
    // }    

    async signPayload(payload: Payload) {
        // const secret = this.configService.get('JWT_KEY')
        return sign(payload, 
            process.env.JWT_KEY,
            { expiresIn: '7d' }); //process.env.JWT_KEY //"success"
      }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
      } 


    
      // async forgotPassword(payload: Payload){
      //   const user = await this.userService.findByPayload(payload);
      //   if (!user) {
      //     throw new HttpException({message: "User doesn't exists"}, HttpStatus.BAD_REQUEST);
      //   }
      // }  

    
    
      
}