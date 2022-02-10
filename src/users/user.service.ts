import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user';
import { RegisterDTO } from './register.dto';
import { LoginDTO } from 'src/auth/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/payload';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User')private userModel: Model<User>,
        private mailService: MailService,

      ) {}
    
      async create(RegisterDTO: RegisterDTO) {
        const { email } = RegisterDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
          throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(RegisterDTO);
        await createdUser.save();
        console.log(createdUser)
        return this.sanitizeUser(createdUser);
      }

       async signUp(user : User) {
      const token = Math.floor(1000 + Math.random()*9000).toString();
      await this.mailService.SendUserConfirmation(user, token);
    }    

      async findByLogin(UserDTO: LoginDTO) {
        const { email, password } = UserDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
          throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
        }
        if (await bcrypt.compare(password, user.password)) {
          return this.sanitizeUser(user)
        } else {
          throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
        }
      }
   // return user object without password
      sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
      }

      async findByPayload(payload: Payload){
        const { email } = payload
        return await this.userModel.findOne({email});
    } 

  
}